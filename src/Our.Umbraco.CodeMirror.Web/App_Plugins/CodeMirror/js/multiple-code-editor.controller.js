/// <reference path="../typed/app.d.ts" />
/// <reference path="../typed/angular.d.ts" />
/// <reference path="../typed/codemirror.d.ts" />
var CodeEditor;
(function (CodeEditor) {
    "use strict";
    var MultipleCodeEditorController = (function () {
        function MultipleCodeEditorController($scope, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.promises = [];
            // Validate type of array
            if (angular.isArray($scope.model.value) != true)
                $scope.model.value = [];
            //// Require current modes
            //angular.forEach(this.modes, (value, index) => {
            //    var modeInfo = CodeMirror.findModeByName(value);
            //});
            // Require mode for each file
            //if ($scope.model.value.length > 0) {
            //    angular.forEach($scope.model.value, (file, index) => {
            //    });
            //}
            // Load configuration
            if ($scope.model.config != null) {
                this.defaultEditorConfig = {
                    lineNumbers: $scope.model.config.lineNumbers == "1",
                    lineWrapping: $scope.model.config.lineWrapping == "1",
                    indentWithTabs: $scope.model.config.indentWithTabs == "1",
                    tabSize: parseInt($scope.model.config.indentSize) || 4,
                    viewportMargin: 10
                };
            }
            // Active when done
            $.when.apply(null, this.promises).done(function () {
                _this.activate();
            });
        }
        MultipleCodeEditorController.prototype.activate = function () {
            var _this = this;
            var $scope = this.$scope;
            $scope.limitReached = function () {
                var max = parseInt($scope.model.config.max);
                if (max <= 0 || max >= $scope.model.value.length)
                    return true;
                return false;
            };
            $scope.addFile = function () {
                var max = parseInt($scope.model.config.max);
                if ($scope.limitReached()) {
                    $scope.model.value.push(new CodeEditor.File());
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
            $scope.autoHeight = function ($index) {
                var file = $scope.model.value[$index];
                return file.config.viewportMargin == Infinity;
            };
            angular.forEach($scope.model.value, function (file, index) {
                if (!file.config) {
                    file.config = _this.defaultEditorConfig;
                }
                else {
                    angular.extend(file.config, _this.defaultEditorConfig, file.config);
                }
            });
            if ($scope.model.value.length <= 0) {
                var min = parseInt($scope.model.config.min);
                for (var i = 0; i < min; i++) {
                    $scope.addFile();
                }
            }
            if ($scope.model.value.length <= 0) {
                $scope.addFile();
            }
            ;
        };
        MultipleCodeEditorController.$inject = ["$scope", "$timeout"];
        return MultipleCodeEditorController;
    })();
    angular.module("umbraco").controller("CodeMirrorEditors.MultipleCodeEditorController", MultipleCodeEditorController);
})(CodeEditor || (CodeEditor = {}));
