/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/codemirror/codemirror.d.ts" />
/// <reference path="../../typings/umbraco/umbraco.d.ts" />
/// <reference path="../app.d.ts" />
var OurCodeMirror;
(function (OurCodeMirror) {
    var PropertyEditors;
    (function (PropertyEditors) {
        "use strict";
        var FileController = (function () {
            function FileController($scope, $timeout, assetService) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.assetService = assetService;
                if (typeof this.defaults === 'string')
                    $scope.model.config.defaults = JSON.parse($scope.model.config.defaults);
                // Create new file if empty
                if (angular.isObject($scope.model.value) == false) {
                    $scope.model.value = new FileEditor($scope.model.config.defaults);
                }
                CodeMirror.modeURL = "/app_plugins/codemirror/components/codemirror/mode/%N/%N.js";
                var timeout = null;
                $scope.filenameChange = function () {
                    // wait for user to finish typing
                    _this.$timeout.cancel(timeout);
                    timeout = $timeout(function () {
                        var file = _this.$scope.model.value;
                        var val = file.name, m, mode, spec;
                        if (m = /.+\.([^.]+)$/.exec(val)) {
                            var info = CodeMirror.findModeByExtension(m[1]);
                            if (info) {
                                mode = info.mode;
                                spec = info.mime;
                            }
                        }
                        else if (/\//.test(val)) {
                            var info = CodeMirror.findModeByMIME(val);
                            if (info) {
                                mode = info.mode;
                                spec = val;
                            }
                        }
                        else {
                            mode = spec = val;
                        }
                        if (mode) {
                            _this.editor.setOption("mode", spec);
                            debugger;
                            CodeMirror.autoLoadMode(_this.editor, mode);
                            file.config.mode = mode;
                        }
                        else {
                            alert("Could not find a mode corresponding to " + val);
                        }
                    }, 700);
                    console.log('filenameChange');
                };
                $scope.$on('CodeMirror', function (event, editor) {
                    _this.editor = editor;
                    console.log('codemirror loaded');
                    $scope.filenameChange();
                });
            }
            FileController.$inject = ["$scope", "$timeout", "assetsService"];
            return FileController;
        }());
        PropertyEditors.FileController = FileController;
    })(PropertyEditors = OurCodeMirror.PropertyEditors || (OurCodeMirror.PropertyEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
angular.module("umbraco").controller("Our.FileController", OurCodeMirror.FileController);
