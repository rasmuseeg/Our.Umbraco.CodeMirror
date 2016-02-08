// <reference path="../../typed/angular.d.ts" />
// <reference path="../../typed/codemirror.d.ts" />

interface IModeInfo {
    name: string;
    mode: string;
    mime: string;
    mimes: Array<string>;
    ext: Array<string>;
}
declare module CodeMirror {
    function findModeByFileName(fileName: string): IModeInfo;
}

interface ICodeMirrorModelValue {
    code: string;
    language: string;
}

interface ICodeMirrorModelConfig {
    lineWrapping: string;
    lineNumbers: string;
    indentWithTabs: string;
    tabSize: string;
    modes: IModeInfo;
}

interface ICodeMirrorModel {
    config: ICodeMirrorModelConfig;
    value: Array<ICodeMirrorFile>;
}

interface ICodeMirrorControllerScope extends ng.IScope {
    editorOptions: CodeMirror.EditorConfiguration;
    model: ICodeMirrorModel;
    modes: {};
    fileIndex: number;
    addFile: () => void;
    removeFile: ($index: number) => void;
    selectFile: ($index: number) => void;
    findMode: ($index: number) => void;
    toggleHeight: ($index: number) => void;
    autoHeight: ($index: number) => void;
    ready: boolean;
}

interface ICodeMirrorController {
}

interface ICodeMirrorFile {
    name: string;
    text: string;
    config: CodeMirror.EditorConfiguration;
}

module App {
    "use strict";

    class CodeMirrorFile implements ICodeMirrorFile {
        public name: string;
        public text: string;
        public config: CodeMirror.EditorConfiguration;

        constructor() {
            this.name = "";
            this.text = "";
            this.config = {};
        }
    }

    class EditorController implements ICodeMirrorController {
        static $inject: string[] = ["$scope", "$timeout"];
        modes = ["htmlmixed", "css", "xml", "javascript", "markdown"];
        promises = [];
        
        constructor(private $scope: ICodeMirrorControllerScope, private $timeout: ng.ITimeoutService) {
            // Validate type of array
            if (angular.isArray($scope.model.value) == false)
                $scope.model.value = [];

            // Require current modes
            if ($scope.model.value.length > 0) {
                angular.forEach($scope.model.value, (file, index) => {
                    this.modes.push(file.config.mode.mode);
                });
            }

            // Query mode scripts
            angular.forEach(this.modes, (value:string, index: number) => {
                this.promises.push(this.fetchMode(value));
            });

            // Active when done
            $.when.apply(null, this.promises).done(() => {
                this.activate();
            });
        }

        activate() {
            var $scope = this.$scope;
            $scope.ready = false;
            $scope.modes = this.modes;

            $scope.fileIndex = 0;

            $scope.addFile = () => {
                if (Array.isArray($scope.model.value) == false) {
                    $scope.model.value = [];
                };

                $scope.model.value.push(new CodeMirrorFile());
                $scope.selectFile(this.$scope.model.value.length);
            }

            $scope.selectFile = ($index) => {
                $scope.fileIndex = $index;
            }

            $scope.removeFile = ($index) => {
                var file = $scope.model.value[$index];
                if (confirm('Confirm that you wish to delete: ' + file.name)) {
                    this.$scope.model.value.splice($index, 1);
                }
            }

            var timeout = null;
            $scope.findMode = ($index) => {
                this.$timeout.cancel(timeout);
                timeout = this.$timeout(() => {
                    var file = $scope.model.value[$index];
                    var modeInfo = CodeMirror.findModeByFileName(file.name);
                    if (modeInfo != null && modeInfo.mode != null) {
                        this.fetchMode(modeInfo.mode).done(() => {
                            file.config.mode = modeInfo;
                        });
                    } else {
                        file.config.mode = null;
                    }
                }, 700);
            }

            $scope.toggleHeight = ($index) => {
                var file = $scope.model.value[$index];

                if (file.config.viewportMargin == Infinity) {
                    file.config.viewportMargin = CodeMirror.defaults.viewportMargin;
                } else {
                    file.config.viewportMargin = Infinity;
                }
            }

            $scope.autoHeight = ($index) => {
                var file = $scope.model.value[$index];
                return file.config.viewportMargin == Infinity;
            }

            // TODO: Only modes selected i config
            //if ($scope.model.config.modes) {
            //    $scope.modes = this.$scope.model.config.modes.split(',');
            //};

            var defaultConfig = <CodeMirror.EditorConfiguration>{
                lineNumbers: true,
                lineWrapping: false,
                indentWithTabs: false,
                tabSize: 4,
                viewportMargin: 10
            };

            angular.forEach($scope.model.value, (file, index) => {
                if (!file.config)
                    file.config = defaultConfig;
                else
                    file.config = angular.extend({}, defaultConfig, file.config);
            })

            // Load each mode for each file
            angular.forEach($scope.model.value, (file, index) => {
                this.$scope.findMode(index);
            });

            if ($scope.model.value.length <= 0) {
                $scope.addFile();
            };

            $scope.ready = true;
        }

        fetchMode(mode: string): JQueryPromise<JQueryXHR> {
            var $scope = this.$scope;
            return $.getScript("/umbraco_client/CodeMirror/Js/Mode/" + mode + "/" + mode + ".js")
                .then(() => {
                    // Success
                    console.log("Successfully loaded mode:", "/umbraco_client/CodeMirror/Js/Mode/" + mode + "/" + mode + ".js");
                },
                () => {
                    // Error
                    console.log("Error loading mode:", mode);
                });
        }
    }
    var app = angular.module("umbraco");
    app.requires.push("ui.codemirror");
    app.controller("CodeMirror.EditorController", EditorController);
}