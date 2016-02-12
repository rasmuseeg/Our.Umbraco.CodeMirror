/// <reference path="../typed/angular.d.ts" />
/// <reference path="../typed/codemirror.d.ts" />
/// <reference path="../typed/app.d.ts" />
var CodeMirror;
(function (CodeMirror) {
    "use strict";
    var FileController = (function () {
        function FileController($scope, $timeout) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            // Validate type of array
            if (angular.isObject($scope.model.value))
                $scope.model.value = new CodeMirror.File();
            // Query mode scripts
            if ($scope.model.config.mime != null) {
                var modeInfo = CodeMirror.findModeByMIME($scope.model.config.mime);
                $scope.editorConfig.mode = modeInfo;
            }
            if ($scope.model.config) {
                var file = $scope.model.value;
                if (!file)
                    file = new CodeMirror.File();
                angular.extend(file.config, file.config);
            }
        }
        FileController.prototype.activate = function () {
            var _this = this;
            var $scope = this.$scope;
            var $timeout = this.$timeout;
            var timeout = null;
            $scope.findMode = function () {
                // wait for user to finish typing
                _this.$timeout.cancel(timeout);
                timeout = $timeout(function () {
                    var file = _this.$scope.model.value;
                    var modeInfo = CodeMirror.findModeByFileName(file.name);
                    if (modeInfo != null && modeInfo.mode != null) {
                        file.config.mode = modeInfo;
                    }
                    else {
                        file.config.mode = null;
                    }
                }, 700);
            };
        };
        FileController.$inject = ["$scope", "$timeout"];
        return FileController;
    })();
    angular.module("umbraco").controller("CodeEditors.FileController", FileController);
})(CodeMirror || (CodeMirror = {}));
