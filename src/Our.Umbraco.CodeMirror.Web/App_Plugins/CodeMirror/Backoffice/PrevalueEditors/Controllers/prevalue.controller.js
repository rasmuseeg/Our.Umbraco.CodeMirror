var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var PrevalueController = (function () {
            function PrevalueController($scope) {
                if (!angular.isObject($scope.model.value)) {
                    $scope.model.value = {};
                }
                if (!angular.isObject($scope.model.value.options)) {
                    $scope.model.value.options = {};
                }
                $scope.config = {
                    defaults: $scope.model.value
                };
            }
            return PrevalueController;
        }());
        PrevalueEditors.PrevalueController = PrevalueController;
        angular.module("umbraco").controller("OurCodeMirror.PropertyEditors.PrevalueController", PrevalueController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
