var CodeMirror;
(function (CodeMirror) {
    var UI;
    (function (UI) {
        "use strict";
        var CodeMirrorDirective = (function () {
            function CodeMirrorDirective() {
                var _this = this;
                this.restrict = "EA";
                this.require = "?ngModel";
                this.scope = {
                    model: "=ngModel",
                    config: "=uiCodemirrorConfig"
                };
                this.link = function (scope, element, attrs) {
                    // Require CodeMirror
                    if (angular.isUndefined(window.CodeMirror)) {
                        throw new Error('ui-codemirror needs CodeMirror to work');
                    }
                    var config = angular.extend({ value: scope.model }, CodeMirror.defaults, scope.config);
                    var editor = _this.newEditor(element, config);
                    scope.element = element;
                    // Apply watchers
                    _this.watchOptionsForChange(editor, scope);
                    _this.watchEditorForChange(editor, scope);
                    // Load the current mode
                    if (config.mode)
                        CodeMirror.autoLoadMode(editor, config.mode.mode);
                    // onLoad callback
                    if (angular.isFunction(scope.config.onLoad)) {
                        scope.config.onLoad(editor);
                    }
                };
                this.newEditor = function (element, option) {
                    var codemirror;
                    if (element[0].tagName === 'TEXTAREA') {
                        // Might bug but still ...
                        codemirror = CodeMirror.fromTextArea(element[0], option);
                    }
                    else {
                        element.html('');
                        codemirror = CodeMirror(function (cm_el) {
                            element.append(cm_el);
                        }, option);
                    }
                    return codemirror;
                };
                this.watchOptionsForChange = function (editor, scope) {
                    var codemirrorDefaultsKeys = Object.keys(CodeMirror.defaults);
                    scope.$watch('config', function (newConfig, oldConfig) {
                        if (!angular.isObject(newConfig)) {
                            return;
                        }
                        codemirrorDefaultsKeys.forEach(function (key) {
                            if (newConfig.hasOwnProperty(key)) {
                                if (oldConfig && newConfig[key] === oldConfig[key]) {
                                    return;
                                }
                                switch (key) {
                                    case "mode":
                                        editor.setOption(key, newConfig[key]);
                                        if (CodeMirror.autoLoadMode)
                                            CodeMirror.autoLoadMode(editor, newConfig[key]);
                                        break;
                                    default:
                                        editor.setOption(key, newConfig[key]);
                                        break;
                                }
                            }
                        });
                    }, true);
                };
                this.watchEditorForChange = function (editor, scope) {
                    var doc = editor.getDoc();
                    scope.$watch('model', function (newValue, oldValue) {
                        //Code mirror expects a string so make sure it gets one
                        //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
                        var docValue = doc.getValue();
                        if (docValue !== newValue) {
                            var safeValue = newValue || '';
                            doc.setValue(safeValue);
                        }
                    });
                    editor.on('change', function (instance, change) {
                        var doc = instance.getDoc();
                        var newValue = doc.getValue();
                        if (newValue !== scope.model) {
                            scope.model = newValue;
                            scope.$apply();
                        }
                    });
                };
            }
            CodeMirrorDirective.$inject = [];
            return CodeMirrorDirective;
        })();
        UI.CodeMirrorDirective = CodeMirrorDirective;
        var app = angular.module("ui.codemirror", []);
        app.directive("uiCodemirror", function () { return new CodeMirrorDirective(); });
    })(UI = CodeMirror.UI || (CodeMirror.UI = {}));
})(CodeMirror || (CodeMirror = {}));
