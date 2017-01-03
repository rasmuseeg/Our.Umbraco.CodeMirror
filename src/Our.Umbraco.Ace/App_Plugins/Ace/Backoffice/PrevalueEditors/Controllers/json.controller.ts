module OurCodeMirror.PrevalueEditors {
    interface IJsonController {

    }

    interface IJsonControllerScope extends IPrevalueScope {
        modes: CodeMirror.IModeInfo[];
        defaults: CodeMirror.EditorConfiguration;
        jsonOverlay: IOverlayJsonOptions;
        edit: () => void;
    }

    interface IOverlayJsonOptions extends umb.directives.IOverlayGeneralOptions<IOverlayJsonOptions> {
        json: string;
    }

    export class JsonController implements IJsonController {
        static $inject: string[] = ["$scope"];
        constructor(private $scope: IJsonControllerScope) {
            $scope.defaults = {

            }

            $scope.edit = () => {
                $scope.jsonOverlay = {
                    view: "/App_Plugins/CodeMirror/Backoffice/PrevalueEditors/Overlays/json.html",
                    title: "Tool settings",
                    show: true,
                    json: JSON.stringify($scope.model.value, null, 2),
                    submit: function (model) {
                        $scope.model.value = JSON.parse(model.json);

                        $scope.jsonOverlay.show = false;
                        $scope.jsonOverlay = null;
                    },
                    close: function (oldModel) {
                        $scope.jsonOverlay.show = false;
                        $scope.jsonOverlay = null;
                    }
                };
            }
        }
    }
    angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.JsonController", JsonController);
}