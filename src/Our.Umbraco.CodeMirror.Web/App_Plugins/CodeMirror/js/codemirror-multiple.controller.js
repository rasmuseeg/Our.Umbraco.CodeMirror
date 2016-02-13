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
            $scope.model.config.min = parseInt($scope.model.config.min) || 0;
            $scope.model.config.max = parseInt($scope.model.config.max) || 0;
            // Parse defaults 
            if (typeof $scope.model.config.defaults === 'string')
                $scope.model.config.defaults = JSON.parse($scope.model.config.defaults);
            // Validate type of array
            if (angular.isArray($scope.model.value) != true)
                $scope.model.value = [];
            else {
                var defaults = $scope.model.config.defaults;
                angular.forEach($scope.model.value, function (file, key) {
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
                        }
                        else {
                            file.config.mode = defaults.mode;
                        }
                    }
                });
            }
            $scope.limitReached = function () {
                var max = $scope.model.config.max;
                if (max > 0 && max <= $scope.model.value.length)
                    return true;
                else
                    return false;
            };
            $scope.addFile = function () {
                if (angular.isArray($scope.model.value) == false)
                    $scope.model.value = [];
                if ($scope.limitReached() == false) {
                    var file = new CodeMirror.FileEditor($scope.model.config.defaults);
                    $scope.model.value.push(file);
                }
            };
            // Can we remove a file?
            $scope.canRemove = function () {
                var min = $scope.model.config.min;
                if (min <= 0 || (min > 0 && min < $scope.model.value.length))
                    return true;
                return false;
            };
            // Removes a file from the collecion
            $scope.removeFile = function ($index) {
                var file = $scope.model.value[$index];
                if (confirm('Confirm that you wish to delete: ' + file.name)) {
                    _this.$scope.model.value.splice($index, 1);
                }
            };
            var timeout = null;
            $scope.filenameChange = function ($index) {
                _this.$timeout.cancel(timeout);
                timeout = _this.$timeout(function () {
                    var file = $scope.model.value[$index];
                    var modeByFileName = CodeMirror.findModeByFileName(file.name);
                    if (modeByFileName != null && modeByFileName.mode != null) {
                        file.config.mode = modeByFileName;
                    }
                    else {
                        file.config.mode = $scope.model.config.defaults.mode;
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
                var min = $scope.model.config.min;
                for (var i = 0; i < min; i++) {
                    $scope.addFile();
                }
            }
        };
        MultipleFilesController.$inject = ["$scope", "$timeout"];
        return MultipleFilesController;
    })();
    angular.module("umbraco").controller("CodeMirror.MultipleFilesController", MultipleFilesController);
})(CodeMirror || (CodeMirror = {}));
