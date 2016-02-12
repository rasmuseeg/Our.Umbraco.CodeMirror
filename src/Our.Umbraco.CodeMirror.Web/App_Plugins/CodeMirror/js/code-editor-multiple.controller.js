/// <reference path="../typed/app.d.ts" />
/// <reference path="../typed/angular.d.ts" />
/// <reference path="../typed/codemirror.d.ts" />
var CodeMirror;
(function (CodeMirror) {
    "use strict";
    var MultipleFilesController = (function () {
        function MultipleFilesController($scope, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            // Validate type of array
            if (angular.isArray($scope.model.value) != true)
                $scope.model.value = [];
            // Parse defaults 
            $scope.model.config.defaults = JSON.parse($scope.model.config.defaults) || CodeMirror.defaultConfig;
            $scope.limitReached = function () {
                var max = parseInt($scope.model.config.max);
                if (max <= 0 || max >= $scope.model.value.length)
                    return true;
                return false;
            };
            $scope.addFile = function () {
                var max = parseInt($scope.model.config.max);
                if ($scope.limitReached()) {
                    $scope.model.value.push(new CodeMirror.File());
                }
            };
            $scope.removeFile = function ($index) {
                var file = $scope.model.value[$index];
                if (confirm('Confirm that you wish to delete: ' + file.name)) {
                    _this.$scope.model.value.splice($index, 1);
                }
            };
            var timeout = null;
            $scope.findMode = function ($index) {
                _this.$timeout.cancel(timeout);
                timeout = _this.$timeout(function () {
                    var file = $scope.model.value[$index];
                    var modeByFileName = CodeMirror.findModeByFileName(file.name);
                    if (modeByFileName != null && modeByFileName.mode != null) {
                        //this.fetchModeScripts(modeByFileName).done(() => {
                        file.config.mode = modeByFileName;
                    }
                    else {
                        file.config.mode = null;
                    }
                }, 700);
            };
            $scope.toggleAutoHeight = function ($index) {
                var file = $scope.model.value[$index];
                if (file.config.viewportMargin == Infinity) {
                    file.config.viewportMargin = CodeMirror.defaults.viewportMargin;
                }
                else {
                    file.config.viewportMargin = Infinity;
                }
            };
            // Active
            this.activate();
        }
        MultipleFilesController.prototype.activate = function () {
            var _this = this;
            var $scope = this.$scope;
            //$scope.autoHeight = ($index) => {
            //    var file = $scope.model.value[$index];
            //    return file.config.viewportMargin == Infinity;
            //}
            angular.forEach($scope.model.value, function (file, index) {
                if (!file.config) {
                    file.config = _this.defaultFileConfig;
                }
                else {
                    angular.extend(file.config, _this.defaultFileConfig, file.config);
                }
            });
            // Add minium requires editors
            if ($scope.model.value.length <= 0) {
                var min = parseInt($scope.model.config.min);
                for (var i = 0; i < min; i++) {
                    $scope.addFile();
                }
            }
        };
        MultipleFilesController.$inject = ["$scope", "$timeout"];
        return MultipleFilesController;
    })();
    angular.module("umbraco").controller("CodeEditors.MultipleFilesController", MultipleFilesController);
})(CodeMirror || (CodeMirror = {}));
