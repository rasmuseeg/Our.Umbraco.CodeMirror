var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var JsonController = (function () {
            function JsonController($scope) {
                this.$scope = $scope;
                $scope.defaults = {};
                $scope.edit = function () {
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
                };
            }
            JsonController.$inject = ["$scope"];
            return JsonController;
        }());
        PrevalueEditors.JsonController = JsonController;
        angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.JsonController", JsonController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
