/// <reference path="../typed/app.d.ts" />
/// <reference path="../typed/angular.d.ts" />
/// <reference path="../typed/codemirror.d.ts" />



module CodeMirror {
    "use strict";

    interface IMultipleFilesConfiguration {
        max: number;
        min: number; // if min is > 0, show empty models. if <= 0 show add 
        defaults: IPrevalueConfiguration;
    }

    interface IMultipleFilesModel {
        config: IMultipleFilesConfiguration;
        value: Array<IFile>;
    }

    interface IMultipleFilesControllerScope extends ng.IScope {
        model: {
            value: IFile[];
            config: IMultipleFilesConfiguration;
        };

        editorOptions: CodeMirror.EditorConfiguration;
        limitReached: () => boolean;
        canRemove: () => boolean;
        addFile: () => void;
        removeFile: ($index: number) => void;
        findMode: ($index: number) => void;
        toggleAutoHeight: ($index: number) => void;
        autoHeight: ($index: number) => void;
    }

    interface IMultipleFilesController {
    }

    class MultipleFilesController implements IMultipleFilesController {
        static $inject: string[] = ["$scope", "$timeout"];

        private defaultFileConfig: CodeMirror.EditorConfiguration;

        constructor(private $scope: IMultipleFilesControllerScope, private $timeout: ng.ITimeoutService)
        {
            $scope.model.config.min = parseInt(<any>$scope.model.config.min);
            $scope.model.config.max = parseInt(<any>$scope.model.config.max);

            // Parse defaults 
            if (typeof $scope.model.config.defaults === 'string')
                $scope.model.config.defaults = JSON.parse(<any>$scope.model.config.defaults);

            // Validate type of array
            if (angular.isArray($scope.model.value) != true)
                $scope.model.value = [];
            else {
                var defaults = $scope.model.config.defaults;
                angular.forEach($scope.model.value, (file, key) => {
                    if (!file.config)
                        file.config = $scope.model.config.defaults;
                    else
                        file.config.lineNumbers = defaults.lineNumbers;

                    // Set current
                    if (!file.config.mode) {
                        if (file.name.length <= 0) {
                            var filenameMode = CodeMirror.findModeByFileName(file.name);
                            if (filenameMode)
                                file.config.mode = filenameMode;
                        } else {
                            file.config.mode = defaults.mode;
                        }
                    }
                });
            }

            $scope.limitReached = () => {
                var max = $scope.model.config.max;
                if (max > 0 && max <= $scope.model.value.length)
                    return true;
                else
                    return false;
            };

            $scope.addFile = () => {
                if ($scope.limitReached() == false) {
                    var file = new FileEditor($scope.model.config.defaults);
                    $scope.model.value.push(file);
                }
            };

            $scope.canRemove = () => {
                var min = $scope.model.config.min;
                if (min > 0 && min < $scope.model.value.length)
                    return true;

                return false;
            };

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
                    var modeByFileName = CodeMirror.findModeByFileName(file.name);
                    if (modeByFileName != null && modeByFileName.mode != null) {
                        //this.fetchModeScripts(modeByFileName).done(() => {
                        file.config.mode = modeByFileName;
                        //});
                    } else {
                        file.config.mode = null;
                    }
                }, 700);
            }

            $scope.toggleAutoHeight = ($index) => {
                var file = $scope.model.value[$index];

                if (file.config.viewportMargin == Infinity) {
                    file.config.viewportMargin = CodeMirror.defaults.viewportMargin;
                } else {
                    file.config.viewportMargin = Infinity;
                }
            }

            // Active
            this.activate();
        }

        activate() {
            var $scope = this.$scope;

            //$scope.autoHeight = ($index) => {
            //    var file = $scope.model.value[$index];
            //    return file.config.viewportMargin == Infinity;
            //}

            angular.forEach($scope.model.value, (file, index) => {
                if (!file.config) {
                    file.config = this.defaultFileConfig;
                }
                else {
                    angular.extend(file.config, this.defaultFileConfig, file.config);
                }
            })

            // Add minium requires editors
            if ($scope.model.value.length <= 0) {
                var min = $scope.model.config.min;
                for (var i = 0; i < min; i++) {
                    $scope.addFile();
                }
            }
        }
    }
    angular.module("umbraco").controller("CodeMirror.MultipleFilesController", MultipleFilesController);
}