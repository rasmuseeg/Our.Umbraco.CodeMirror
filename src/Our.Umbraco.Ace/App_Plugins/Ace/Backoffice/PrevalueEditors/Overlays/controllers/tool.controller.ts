module OurCodeMirror.PrevalueEditors.Overlays {
    export class ToolController {
        constructor(private $scope: IToolsDialogScope) {
            $scope.keyMapRegex = /(((Ctrl|Alt|Shift|Cmd)-)+[A-Z])/;
            $scope.iconPicker = () => {
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
            }
        }
    }

    interface IToolsDialogScope extends ng.IScope {
        keyMapRegex: RegExp;
        model: { tool: ITool; };

        iconOverlay: umb.directives.IOverlayIconPicker;
        iconPicker: () => void;
    }

    //angular.module("umbraco").requires.push("ngMessages");
    angular.module("umbraco").controller("OurCodeMirror.Dialogs.ToolController", ToolController);
}