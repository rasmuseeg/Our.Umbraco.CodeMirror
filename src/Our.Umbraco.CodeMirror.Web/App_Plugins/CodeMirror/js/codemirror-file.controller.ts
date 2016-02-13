/// <reference path="../typed/angular.d.ts" />
/// <reference path="../typed/codemirror.d.ts" />
/// <reference path="../typed/app.d.ts" />

module CodeMirror {
    "use strict";

    interface IFileControllerScope extends ng.IScope {
        model: {
            value: IFile;
            config: {
                defaults: IPrevalueConfiguration
            };
        };
        filenameChange: () => void;
        toggleAutoHeight: () => void;
    }

    interface IFileController {
    }

    class FileController implements IFileController {
        static $inject: string[] = ["$scope", "$timeout"];
        private defaults 
        
        constructor(private $scope: IFileControllerScope, private $timeout: ng.ITimeoutService) {

            if (typeof this.defaults === 'string')
                $scope.model.config.defaults = JSON.parse(<any>$scope.model.config.defaults);

            // Create new file if empty
            if (angular.isObject($scope.model.value) == false) {
                $scope.model.value = new FileEditor($scope.model.config.defaults);
            }

            var timeout = null;
            $scope.filenameChange = () => {
                // wait for user to finish typing
                this.$timeout.cancel(timeout);
                timeout = $timeout(() => {
                    var file = this.$scope.model.value;
                    var modeInfo = CodeMirror.findModeByFileName(file.name);

                    if (modeInfo != null && modeInfo.mode != null) {
                        file.config.mode = modeInfo;
                    } else {
                        file.config.mode = $scope.model.config.defaults.mode;
                    }
                }, 700);
            }
        }
    }

    angular.module("umbraco").controller("CodeMirror.FileController", FileController);
}