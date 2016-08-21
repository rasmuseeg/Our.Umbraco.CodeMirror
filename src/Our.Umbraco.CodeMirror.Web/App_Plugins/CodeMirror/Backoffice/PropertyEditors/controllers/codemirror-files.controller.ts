module OurCodeMirror.PropertyEditors {
    "use strict";

    interface IFileControllerScope extends ng.IScope {
        model: {
            value: IFile;
            config: {
                defaults: any;
            };
        };
        filenameChange: () => void;
        toggleAutoHeight: () => void;
        loaded: (editor: CodeMirror.Editor) => void;
    }

    interface IFileController {
    }

    export class FilesController implements IFileController {
        static $inject: string[] = ["$scope", "$timeout", "assetsService"];
        private defaults;
        private editor: CodeMirror.Editor;

        constructor(
            private $scope: IFileControllerScope,
            private $timeout: ng.ITimeoutService,
            private assetService: umb.services.IAssetsService) {

            if (typeof this.defaults === 'string')
                $scope.model.config.defaults = JSON.parse(<any>$scope.model.config.defaults);

            // Create new file if empty
            if (angular.isObject($scope.model.value) == false) {
                $scope.model.value = new FileEditor($scope.model.config.defaults);
            }

            CodeMirror.modeURL = "/app_plugins/codemirror/components/codemirror/mode/%N/%N.js";

            var timeout = null;
            $scope.filenameChange = () => {
                // wait for user to finish typing
                this.$timeout.cancel(timeout);
                timeout = $timeout(() => {
                    var file = this.$scope.model.value;
                    var val = file.name, m, mode, spec;
                    if (m = /.+\.([^.]+)$/.exec(val)) {
                        var info = (<any>CodeMirror).findModeByExtension(m[1]);
                        if (info) {
                            mode = info.mode;
                            spec = info.mime;
                        }
                    } else if (/\//.test(val)) {
                        var info = (<any>CodeMirror).findModeByMIME(val);
                        if (info) {
                            mode = info.mode;
                            spec = val;
                        }
                    } else {
                        mode = spec = val;
                    }
                    if (mode) {
                        this.editor.setOption("mode", spec);
                        debugger;
                        CodeMirror.autoLoadMode(this.editor, mode);
                        file.config.mode = mode;
                    } else {
                        alert("Could not find a mode corresponding to " + val);
                    }
                }, 700);

                console.log('filenameChange');
            }

            $scope.$on('CodeMirror', (event, editor: CodeMirror.Editor) => {
                this.editor = editor;
                console.log('codemirror loaded');
                $scope.filenameChange();
            });
        }
    }
    angular.module("umbraco").controller("OurCodeMirror.PropertyEditors.FilesController", FilesController);
}
