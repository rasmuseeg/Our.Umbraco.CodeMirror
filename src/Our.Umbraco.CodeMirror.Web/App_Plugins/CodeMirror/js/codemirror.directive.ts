module CodeMirror.UI {
    "use strict";

    interface IUICodeMirrorDirective extends ng.IDirective {
        link: (scope: IUICodeMirrorDirectiveScope, element: ng.IAugmentedJQuery, attrs: IUICodeMirrorDirectiveAttributes) => void;
        newEditor: (element: ng.IAugmentedJQuery, options: CodeMirror.EditorConfiguration) => CodeMirror.Editor;
        watchOptionsForChange: (ditor: CodeMirror.Editor, scope: IUICodeMirrorDirectiveScope) => void;
        watchEditorForChange: (editor: CodeMirror.Editor, scope: IUICodeMirrorDirectiveScope) => void;
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

    export class CodeMirrorDirective implements ng.IDirective {
        static $inject = [];

        public restrict = "EA";
        public require = "?ngModel";
        public scope = {
            model: "=ngModel",
            config: "=uiCodemirrorConfig"
        };

        public link = (scope: IUICodeMirrorDirectiveScope, element: ng.IAugmentedJQuery, attrs: IUICodeMirrorDirectiveAttributes) => {
            // Require CodeMirror
            if (angular.isUndefined((<any>window).CodeMirror)) {
                throw new Error('ui-codemirror needs CodeMirror to work');
            }

            var config = angular.extend(
                { value: scope.model },
                CodeMirror.defaults,
                scope.config
            );

            var editor = this.newEditor(element, config);
            scope.element = element;

            // Apply watchers
            this.watchOptionsForChange(editor, scope);
            this.watchEditorForChange(editor, scope);

            // Load the current mode
            if(config.mode)
                CodeMirror.autoLoadMode(editor, config.mode.mode);

            // onLoad callback
            if (angular.isFunction(scope.config.onLoad)) {
                scope.config.onLoad(editor);
            }
        }

        public newEditor = (element: ng.IAugmentedJQuery, option: CodeMirror.EditorConfiguration) => {
            var codemirror: CodeMirror.Editor;

            if (element[0].tagName === 'TEXTAREA') {
                // Might bug but still ...
                codemirror = CodeMirror.fromTextArea(<HTMLTextAreaElement>element[0], option);
            } else {
                element.html('');
                codemirror = CodeMirror((cm_el) => {
                    element.append(cm_el);
                }, option);
            }

            return codemirror;
        }

        public watchOptionsForChange = (editor: CodeMirror.Editor, scope: IUICodeMirrorDirectiveScope) => {
            var codemirrorDefaultsKeys = Object.keys(CodeMirror.defaults);

            scope.$watch<CodeMirror.EditorConfiguration>('config', (newConfig, oldConfig) => {
                if (!angular.isObject(newConfig)) { return; }

                codemirrorDefaultsKeys.forEach(function (key) {
                    if (newConfig.hasOwnProperty(key)) {
                        if (oldConfig && newConfig[key] === oldConfig[key]) {
                            return;
                        }
                        switch (key){
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
        }

        public watchEditorForChange = (editor: CodeMirror.Editor, scope: IUICodeMirrorDirectiveScope) => {
            var doc = editor.getDoc();
            scope.$watch('model', (newValue:string, oldValue:string) => {
                //Code mirror expects a string so make sure it gets one
                //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
                var docValue = doc.getValue();
                if (docValue !== newValue) {
                    var safeValue = newValue || '';
                    doc.setValue(safeValue);
                }
            });

            editor.on('change', (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeLinkedList) => {
                var doc = instance.getDoc();
                var newValue = doc.getValue();
                if (newValue !== scope.model) {
                    scope.model = newValue;
                    scope.$apply();
                }
            });
        }

        constructor() {
        }
    }

    var app = angular.module("ui.codemirror", []);
    app.directive("uiCodemirror", () => new CodeMirrorDirective());
}