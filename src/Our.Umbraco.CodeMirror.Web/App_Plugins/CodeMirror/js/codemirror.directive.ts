interface IModeInfo {
    name: string;
    mode: string;
    mime: string;
    mimes: Array<string>;
    ext: Array<string>;
}

module UICodeMirror {
    "use strict";

    interface IUICodeMirrorDirective extends ng.IDirective {
    }

    interface IUICodeMirrorDirectiveScope extends ng.IScope {
        model: string;
        config: CodeMirror.EditorConfiguration;
        element: ng.IAugmentedJQuery;
    }

    interface IUICodeMirrorDirectiveAttributes extends ng.IAttributes {
        uiCodemirror: any;
        uiCodemirrorOptions: CodeMirror.EditorConfiguration;
    }

    UICodeMirrorDirective.$inject = ["$window"];
    function UICodeMirrorDirective($window: ng.IWindowService): IUICodeMirrorDirective {
        return {
            restrict: 'EA',
            require: '?ngModel',
            scope: {
                model: '=ngModel',
                config: '=uiCodemirrorConfig'
            },
            link: link
        }

        function link(scope: IUICodeMirrorDirectiveScope, element: ng.IAugmentedJQuery, attrs: IUICodeMirrorDirectiveAttributes) {
            // Require CodeMirror
            if (angular.isUndefined((<any>window).CodeMirror)) {
                throw new Error('ui-codemirror needs CodeMirror to work');
            }

            var codeMirrorConfig = angular.extend(
                { value: scope.model },
                CodeMirror.defaults,
                scope.config
            );

            var codemirror = newCodemirrorEditor(element, codeMirrorConfig);
            scope.element = element;
            // Apply watchers
            watchOptionsForChange(codemirror, scope);
            watchCodeMirrorForChange(codemirror, scope);

            // Allow access to the CodeMirror instance through a broadcasted event
            // eg: $broadcast('CodeMirror', function(cm){...});
            //scope.$on('CodeMirror', function (event, callback) {
            //    if (angular.isFunction(callback)) {
            //        callback(codemirror);
            //    } else {
            //        throw new Error('the CodeMirror event requires a callback function');
            //    }
            //});

            // onLoad callback
            if (angular.isFunction(codeMirrorConfig.onLoad)) {
                codeMirrorConfig.onLoad(codemirror);
            }
        }

        function newCodemirrorEditor(element: ng.IAugmentedJQuery, codeMirrorOptions: CodeMirror.EditorConfiguration) {
            var codemirror: CodeMirror.Editor;

            if (element[0].tagName === 'TEXTAREA') {
                // Might bug but still ...
                codemirror = CodeMirror.fromTextArea(<HTMLTextAreaElement>element[0], codeMirrorOptions);
            } else {
                element.html('');
                codemirror = CodeMirror((cm_el) => {
                    element.append(cm_el);
                }, codeMirrorOptions);
            }

            return codemirror;
        }

        function watchOptionsForChange(codemirror: CodeMirror.Editor, scope: IUICodeMirrorDirectiveScope) {
            var codemirrorDefaultsKeys = Object.keys(CodeMirror.defaults);
            scope.$watch('options', (newValues, oldValues, scope) => {
                if (!angular.isObject(newValues)) { return; }

                codemirrorDefaultsKeys.forEach(function (key) {
                    if (newValues.hasOwnProperty(key)) {
                        if (oldValues && newValues[key] === oldValues[key]) {
                            return;
                        }
                        codemirror.setOption(key, newValues[key]);
                    }
                });
            }, true);
        }

        function watchCodeMirrorForChange(codemirror: CodeMirror.Editor, scope: IUICodeMirrorDirectiveScope) {

            var doc = codemirror.getDoc();
            scope.$watch('model', (newValue:string, oldValue:string) => {
                //Code mirror expects a string so make sure it gets one
                //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
                var docValue = doc.getValue();
                if (docValue !== newValue) {
                    var safeValue = newValue || '';
                    doc.setValue(safeValue);
                }
            });

            codemirror.on('change', (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeLinkedList) => {
                var doc = instance.getDoc();
                var newValue = doc.getValue();
                if (newValue !== scope.model) {
                    scope.model = newValue;
                    scope.$apply();
                }
            });
        }
    }

    var app = angular.module("ui.codemirror", []);
    app.directive("uiCodemirror", UICodeMirrorDirective);
}