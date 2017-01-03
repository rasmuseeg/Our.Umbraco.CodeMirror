/// <reference types="ace" />
/// <reference types="umbraco" />
/// <reference types="angular" />

module OurUmbracoAce {
    export class CodeMirrorController implements ICodeMirrorController {
        static $inject: string[] = ["$scope", "$q", "assetsService", "$injector"];

        private addonPath: string = "~/App_Plugins/CodeMirror/Assets/codemirror/addon/";
        private modePath: string = "/App_Plugins/CodeMirror/Assets/codemirror/mode/%N/%N.js";

        public cm: Ace.Editor;

        constructor(
            private $scope: ICodeMirrorControllerScope,
            private $q: ng.IQService,
            private assetsService: umb.services.IAssetsService,
            private $injector: ng.auto.IInjectorService
        ) {
            $scope.ready = false;
            $scope.options = {};
            // Convert mode to string
            if (angular.isObject($scope.model.config.defaults.modeInfo)) {
                $scope.options.mode = $scope.model.config.defaults.modeInfo.mode;
            } else {
                $scope.options.mode = $scope.model.config.defaults.modeInfo;
            }

            // Set theme (.cm-s-{name})
            if (angular.isString($scope.model.config.defaults.theme.name)) {
                $scope.options.theme = $scope.model.config.defaults.theme.name;
            }

            this.loadAddonFolders($scope.model.config.defaults.addons)
                .then(() => {
                    $scope.ready = true;
                }, (reason) => {
                    console.log(reason);
                });

            $scope.$on('codemirror', (event, editor: CodeMirror.Editor) => {
                this.cm = editor;
                this.registerShortcuts(editor, $scope.tools);
            });

            $scope.tools = $scope.model.config.defaults.tools;
            $scope.executeAction = ($index: number) => {
                this.executeAction($index);
            };
        }

        /**
         * Converts the tool action to a function and executes.
         * @param {Number} $index
         */
        public executeAction($index: number) {
            var strAction: any = this.$scope.tools[$index].action;
            if (typeof strAction === 'string') {
                var r = "return " + strAction;
                var func = <Function>new Function(r)();
                this.$injector.invoke(func, null, { "cm": this.cm, "cmCtrl": this });
            }
        }

        /**
         * Converts the tool action to a function and executes.
         * @param {Object} cm
         * @param {Object} tools
         */
        public registerShortcuts(cm: CodeMirror.Editor, tools: OurCodeMirror.PrevalueEditors.ITool[]) {
            if (!angular.isObject(this.$scope.options.extraKeys)) {
                this.$scope.options.extraKeys = {};
            }

            angular.forEach(tools, (value, index) => {
                if (value.shortcut) {
                    this.$scope.options.extraKeys[value.shortcut] = () => {
                        this.executeAction(index);
                    }
                }
            });
        }

        /**
         * Loads addons in folders
         * @param {Object} addons
         */
        public loadAddonFolders(addons: OurCodeMirror.PrevalueEditors.IAddonFolders): ng.IPromise<{}> {
            var promises: ng.IPromise<{}>[] = [];

            angular.forEach(addons, (addons, folder) => {
                angular.forEach(addons, (addon, index) => {
                    promises.push(this.loadAddon(folder, addon));
                });
            })

            return this.$q.all(promises);
        }

        /**
         * Loads an addon in a folder
         * @param {String} folder
         * @param {Object} AddonFolders
         */
        public loadAddon(folder: string, addon: OurCodeMirror.PrevalueEditors.IAddon): ng.IPromise<{}> {
            var promises: ng.IPromise<{}>[] = [];
            angular.forEach(addon.files, (file, index) => {
                var path = this.addonPath + "/" + folder + "/" + file;
                if (file.indexOf('.js') > -1)
                    promises.push(this.assetsService.loadJs(path, this.$scope, null, 300));
                else if (file.indexOf('.css') > -1)
                    promises.push(this.assetsService.loadCss(path, this.$scope, null, 300));
            });
            return this.$q.all(promises);
        }

        /**
         * Insert a string at cursor position
         * @param  {String} insertion
         */
        public insert(insertion) {
            var doc = this.cm.getDoc();
            var cursor = doc.getCursor();

            doc.replaceRange(insertion, { line: cursor.line, ch: cursor.ch });
        }

        /**
         * Insert a string at the start and end of a selection
         * @param {String} start
         * @param {String} end
         */
        public insertAround(start, end) {
            var doc = this.cm.getDoc();
            var cursor = doc.getCursor();

            if (doc.somethingSelected()) {
                var selection = doc.getSelection();
                doc.replaceSelection(start + selection + end);
            } else {
                // If no selection then insert start and end args and set cursor position between the two.
                doc.replaceRange(start + end, { line: cursor.line, ch: cursor.ch });
                doc.setCursor({ line: cursor.line, ch: cursor.ch + start.length })
            }
        }

        /**
         * Insert a string before a selection
         * @param {String} insertion
         */
        public insertBefore(insertion: string, cursorOffset) {
            var doc = this.cm.getDoc();
            var cursor = doc.getCursor();

            if (doc.somethingSelected()) {
                var selections = doc.listSelections();
                selections.forEach(function (selection) {
                    var pos = [selection.head.line, selection.anchor.line].sort();

                    for (var i = pos[0]; i <= pos[1]; i++) {
                        doc.replaceRange(insertion, { line: i, ch: 0 });
                    }

                    doc.setCursor({ line: pos[0], ch: cursorOffset || 0 });
                });
            } else {
                doc.replaceRange(insertion, { line: cursor.line, ch: 0 });
                doc.setCursor({ line: cursor.line, ch: cursorOffset || 0 })
            }
        }
    }

    angular.module("umbraco").controller("OurCodeMirror.PropertyEditors.CodeMirrorController", CodeMirrorController);

    interface ICodeMirrorController {
        /* Helper methods */
        insert: (insertion: string) => void;
        insertAround: (start: string, end: string) => void;
        insertBefore: (insertion: string, cursorOffset: number) => void;
    }

    interface ICodeMirrorControllerScope extends ng.IScope {
        model: ICodeMirrorModel;
        options: CodeMirror.EditorConfiguration;
        ready: boolean;
        tools: OurCodeMirror.PrevalueEditors.ITool[];
        executeAction: ($index: number) => void;
    }

    interface ICodeMirrorModel {
        value: string;
        config: ICodeMirrorModelConfig;
    }

    interface ICodeMirrorModelConfig {
        defaults: OurCodeMirror.PrevalueEditors.IPrevalueModelValue;
    }
}