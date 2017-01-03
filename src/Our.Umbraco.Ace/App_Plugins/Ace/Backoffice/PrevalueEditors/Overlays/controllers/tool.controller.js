var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var Overlays;
        (function (Overlays) {
            var ToolController = (function () {
                function ToolController($scope) {
                    this.$scope = $scope;
                    $scope.keyMapRegex = /(((Ctrl|Alt|Shift|Cmd)-)+[A-Z])/;
                    $scope.iconPicker = function () {
                        $scope.iconOverlay = {
                            view: "iconpicker",
                            title: "Tool settings",
                            show: true,
                            submit: function (model) {
                                if (model.icon)
                                    $scope.model.tool.className = model.icon;
                                if (model.color)
                                    $scope.model.tool.className += " " + model.color;
                                $scope.iconOverlay.show = false;
                                $scope.iconOverlay = null;
                            },
                            close: function (oldModel) {
                                if (oldModel.icon)
                                    $scope.model.tool.className = oldModel.icon;
                                if (oldModel.color)
                                    $scope.model.tool.className += " " + oldModel.color;
                                $scope.iconOverlay.show = false;
                                $scope.iconOverlay = null;
                            }
                        };
                    };
                }
                return ToolController;
            }());
            Overlays.ToolController = ToolController;
            //angular.module("umbraco").requires.push("ngMessages");
            angular.module("umbraco").controller("OurCodeMirror.Dialogs.ToolController", ToolController);
        })(Overlays = PrevalueEditors.Overlays || (PrevalueEditors.Overlays = {}));
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
