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
            if (typeof this.defaults === 'string')
                $scope.model.config.defaults = JSON.parse($scope.model.config.defaults);
            // Create new file if empty
            if (angular.isObject($scope.model.value) == false) {
                $scope.model.value = new CodeMirror.FileEditor($scope.model.config.defaults);
            }
        }
        FileController.prototype.activate = function () {
            var _this = this;
            var $scope = this.$scope;
            var $timeout = this.$timeout;
            var timeout = null;
            $scope.filenameChange = function () {
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
    angular.module("umbraco").controller("CodeMirror.FileController", FileController);
})(CodeMirror || (CodeMirror = {}));
