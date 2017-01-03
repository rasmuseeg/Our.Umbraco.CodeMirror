
module OurUmbracoAce.Directives {
    "use strict";

    // Add the directive to umbraco
    //angular.module("umbraco").requires.push("umbCodemirror");

    /**
     * umbCodeMirrorDirective
     */
    interface IUmbCodeMirrorDirective extends ng.IDirective {
        link: (scope: IUmbCodeMirrorDirectiveScope, element: ng.IAugmentedJQuery, attrs: IUmbCodeMirrorDirectiveAttrs) => void;
        newEditor: (element: ng.IAugmentedJQuery, options: CodeMirror.EditorConfiguration) => CodeMirror.Editor;
        watchOptionsForChange: (ditor: CodeMirror.Editor, scope: IUmbCodeMirrorDirectiveScope) => void;
        watchEditorForChange: (editor: CodeMirror.Editor, scope: IUmbCodeMirrorDirectiveScope) => void;
    }

    interface IUmbCodeMirrorDirectiveScope extends ng.IScope {
        callback: Function;
    }

    interface IUmbCodeMirrorDirectiveAttrs extends ng.IAttributes {
        options: CodeMirror.EditorConfiguration;
        callback: Function;
    }

    export class AceDirective implements ng.IDirective {
        static $inject = [];

        public restrict = "EA";
        public require = "?ngModel";

        public link = (
            scope: IUmbCodeMirrorDirectiveScope,
            iElement: ng.IAugmentedJQuery,
            iAttrs: IUmbCodeMirrorDirectiveAttrs,
            ngModelCtrl: ng.INgModelController
        ) => {
            // Require CodeMirror
            if (angular.isUndefined((<any>window).CodeMirror)) {
                throw new Error('umb-codemirror needs CodeMirror to work');
            }

            var config: CodeMirror.EditorConfiguration = angular.extend(
                { value: '' },
                scope.$eval((<string>iAttrs.options))
            );

            // Auto load mode

            var editor = this.createEditor(iElement, config);

            CodeMirror.modeURL = "/App_Plugins/CodeMirror/Assets/CodeMirror/mode/%N/%N.js";
            CodeMirror.autoLoadMode(editor, config.mode);

            this.ngModelLink(scope, editor, ngModelCtrl);

            // Apply watchers
            this.configOptionsWatcher(
                editor,
                iAttrs.options,
                scope
            );

            scope.$eval(() => {
                editor.refresh();
            });

            var callback = (<Function>scope.$eval((<any>iAttrs.callback)));
            if (callback) {
                debugger;
                callback(editor);
            }

            // Emit to parent scope
            scope.$emit('codemirror', editor);
        }

        public createEditor(iElement: ng.IAugmentedJQuery, option: CodeMirror.EditorConfiguration): CodeMirror.Editor {
            var codemirror: CodeMirror.Editor;

            if (iElement[0].tagName === 'TEXTAREA') {
                // Might bug but still ...
                codemirror = CodeMirror.fromTextArea(<HTMLTextAreaElement>iElement[0], option);
            } else {
                iElement.html('');
                codemirror = CodeMirror((cm_el) => {
                    iElement.append(cm_el);
                }, option);
            }

            return codemirror;
        }

        public configOptionsWatcher(editor: CodeMirror.Editor, uiCodemirrorAttr, scope): void {
            if (!uiCodemirrorAttr) { return; }

            var codemirrorDefaultsKeys = Object.keys(CodeMirror.defaults);
            scope.$watch(uiCodemirrorAttr, updateOptions, true);
            function updateOptions(newValues, oldValue) {
                if (!angular.isObject(newValues)) { return; }
                codemirrorDefaultsKeys.forEach(function (key) {
                    if (newValues.hasOwnProperty(key)) {

                        if (oldValue && newValues[key] === oldValue[key]) {
                            return;
                        }

                        editor.setOption(key, newValues[key]);

                        if (key === "mode")
                        {
                            // TODO: if key is not a string but object
                            CodeMirror.autoLoadMode(editor, newValues[key]);
                        }
                        editor.refresh();
                    }
                });
            }
        }

        public ngModelLink(scope: IUmbCodeMirrorDirectiveScope, editor: CodeMirror.Editor, ngModelCtrl: ng.INgModelController) {
            if (!ngModelCtrl) { return; }
            // CodeMirror expects a string, so make sure it gets one.
            // This does not change the model.
            ngModelCtrl.$formatters.push((value) => {
                if (angular.isUndefined(value) || value === null) {
                    return '';
                } else if (angular.isObject(value) || angular.isArray(value)) {
                    throw new Error('umb-codemirror cannot use an object or an array as a model');
                }
                return value;
            });

            // Override the ngModelController $render method, which is what gets called when the model is updated.
            // This takes care of the synchronizing the codeMirror element with the underlying model, in the case that it is changed by something else.
            ngModelCtrl.$render = () => {
                var safeViewValue = ngModelCtrl.$modelValue || ngModelCtrl.$viewValue || '';

                var doc = editor.getDoc();
                var value = doc.getValue();

                if (value !== safeViewValue) {
                    var safeValue = safeViewValue;
                    doc.setValue(safeValue);
                }
            };

            // Keep the ngModel in sync with changes from CodeMirror
            editor.on('change', (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeLinkedList) => {
                var doc = instance.getDoc();
                var newValue = doc.getValue();
                if (newValue !== ngModelCtrl.$viewValue) {
                    ngModelCtrl.$setViewValue(newValue);
                }
            });
        }
    }

    var app = angular.module("umbraco.directives");
    app.directive("umbCodemirror", () => new CodeMirrorDirective());

    
}