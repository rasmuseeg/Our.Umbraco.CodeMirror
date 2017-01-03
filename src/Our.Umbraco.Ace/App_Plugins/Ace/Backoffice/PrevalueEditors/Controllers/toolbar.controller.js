var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var ToolbarController = (function () {
            function ToolbarController($scope, dialogService, assetsService) {
                var _this = this;
                this.$scope = $scope;
                this.dialogService = dialogService;
                this.assetsService = assetsService;
                var defaults = {
                    mode: "javascript",
                    lineNumbers: true,
                    matchBrackets: true,
                    viewportMargin: Infinity
                };
                $scope.options = defaults;
                if (!angular.isObject($scope.model.value)) {
                    $scope.model.value = {
                        tools: null
                    };
                }
                if (!angular.isArray($scope.model.value.tools)) {
                    $scope.model.value.tools = [];
                }
                $scope.addTool = function () {
                    $scope.toolOverlay = {
                        view: "/App_Plugins/CodeMirror/Backoffice/PrevalueEditors/Overlays/tool.html",
                        title: "Tool settings",
                        show: true,
                        tool: {
                            name: "",
                            action: "",
                            className: "",
                            shortcut: ""
                        },
                        submit: function (model) {
                            $scope.model.value.tools.push(model.tool);
                            $scope.toolOverlay.show = false;
                            $scope.toolOverlay = null;
                        },
                        close: function (oldModel) {
                            $scope.toolOverlay.show = false;
                            $scope.toolOverlay = null;
                        }
                    };
                };
                $scope.deleteTool = function ($index) {
                    $scope.model.value.tools.splice($index, 1);
                };
                $scope.editTool = function ($index) {
                    var tool = $scope.model.value.tools[$index];
                    $scope.toolOverlay = {
                        view: "/App_Plugins/CodeMirror/Backoffice/PrevalueEditors/Overlays/tool.html",
                        title: "Tool settings",
                        show: true,
                        tool: tool,
                        submit: function (model) {
                            $scope.model.value.tools[$index] = model.tool;
                            $scope.toolOverlay.show = false;
                            $scope.toolOverlay = null;
                        },
                        close: function (oldModel) {
                            $scope.model.value.tools[$index] = oldModel.tool;
                            $scope.toolOverlay.show = false;
                            $scope.toolOverlay = null;
                        }
                    };
                };
                $scope.$on('codemirror', function (event, editor) {
                    _this.editor = editor;
                    CodeMirror.autoLoadMode(_this.editor, defaults.mode);
                });
            }
            ToolbarController.$inject = ["$scope", "dialogService", "assetsService"];
            return ToolbarController;
        }());
        PrevalueEditors.ToolbarController = ToolbarController;
        angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.ToolbarController", ToolbarController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
