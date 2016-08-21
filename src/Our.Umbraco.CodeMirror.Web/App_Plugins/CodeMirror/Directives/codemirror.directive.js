var OurCodeMirror;
(function (OurCodeMirror) {
    var Directives;
    (function (Directives) {
        "use strict";
        var CodeMirrorDirective = (function () {
            function CodeMirrorDirective() {
                var _this = this;
                this.restrict = "EA";
                this.require = "?ngModel";
                this.link = function (scope, iElement, iAttrs, ngModelCtrl) {
                    // Require CodeMirror
                    if (angular.isUndefined(window.CodeMirror)) {
                        throw new Error('umb-codemirror needs CodeMirror to work');
                    }
                    var config = angular.extend({ value: '' }, scope.$eval(iAttrs.options));
                    // Auto load mode
                    var editor = _this.createEditor(iElement, config);
                    CodeMirror.modeURL = "/App_Plugins/CodeMirror/Assets/CodeMirror/mode/%N/%N.js";
                    CodeMirror.autoLoadMode(editor, config.mode);
                    _this.ngModelLink(scope, editor, ngModelCtrl);
                    // Apply watchers
                    _this.configOptionsWatcher(editor, iAttrs.options, scope);
                    scope.$eval(function () {
                        editor.refresh();
                    });
                    var callback = scope.$eval(iAttrs.callback);
                    if (callback) {
                        debugger;
                        callback(editor);
                    }
                    // Emit to parent scope
                    scope.$emit('codemirror', editor);
                };
            }
            CodeMirrorDirective.prototype.createEditor = function (iElement, option) {
                var codemirror;
                if (iElement[0].tagName === 'TEXTAREA') {
                    // Might bug but still ...
                    codemirror = CodeMirror.fromTextArea(iElement[0], option);
                }
                else {
                    iElement.html('');
                    codemirror = CodeMirror(function (cm_el) {
                        iElement.append(cm_el);
                    }, option);
                }
                return codemirror;
            };
            CodeMirrorDirective.prototype.configOptionsWatcher = function (editor, uiCodemirrorAttr, scope) {
                if (!uiCodemirrorAttr) {
                    return;
                }
                var codemirrorDefaultsKeys = Object.keys(CodeMirror.defaults);
                scope.$watch(uiCodemirrorAttr, updateOptions, true);
                function updateOptions(newValues, oldValue) {
                    if (!angular.isObject(newValues)) {
                        return;
                    }
                    codemirrorDefaultsKeys.forEach(function (key) {
                        if (newValues.hasOwnProperty(key)) {
                            if (oldValue && newValues[key] === oldValue[key]) {
                                return;
                            }
                            editor.setOption(key, newValues[key]);
                            if (key === "mode") {
                                // TODO: if key is not a string but object
                                CodeMirror.autoLoadMode(editor, newValues[key]);
                            }
                            editor.refresh();
                        }
                    });
                }
            };
            CodeMirrorDirective.prototype.ngModelLink = function (scope, editor, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }
                // CodeMirror expects a string, so make sure it gets one.
                // This does not change the model.
                ngModelCtrl.$formatters.push(function (value) {
                    if (angular.isUndefined(value) || value === null) {
                        return '';
                    }
                    else if (angular.isObject(value) || angular.isArray(value)) {
                        throw new Error('umb-codemirror cannot use an object or an array as a model');
                    }
                    return value;
                });
                // Override the ngModelController $render method, which is what gets called when the model is updated.
                // This takes care of the synchronizing the codeMirror element with the underlying model, in the case that it is changed by something else.
                ngModelCtrl.$render = function () {
                    var safeViewValue = ngModelCtrl.$modelValue || ngModelCtrl.$viewValue || '';
                    var doc = editor.getDoc();
                    var value = doc.getValue();
                    if (value !== safeViewValue) {
                        var safeValue = safeViewValue;
                        doc.setValue(safeValue);
                    }
                };
                // Keep the ngModel in sync with changes from CodeMirror
                editor.on('change', function (instance, change) {
                    var doc = instance.getDoc();
                    var newValue = doc.getValue();
                    if (newValue !== ngModelCtrl.$viewValue) {
                        ngModelCtrl.$setViewValue(newValue);
                    }
                });
            };
            CodeMirrorDirective.$inject = [];
            return CodeMirrorDirective;
        }());
        Directives.CodeMirrorDirective = CodeMirrorDirective;
        var app = angular.module("umbraco.directives");
        app.directive("umbCodemirror", function () { return new CodeMirrorDirective(); });
    })(Directives = OurCodeMirror.Directives || (OurCodeMirror.Directives = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
