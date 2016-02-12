var CodeMirror;
(function (CodeMirror) {
    var ConfigController = (function () {
        function ConfigController($scope) {
            this.$scope = $scope;
            if (!$scope.model.value || angular.isObject($scope.model.value) == false) {
                angular.extend($scope.model.value, CodeMirror.defaultConfig);
            }
            $scope.modes = CodeMirror.modeInfo;
        }
        ConfigController.$inject = ["$scope", "$timeout"];
        return ConfigController;
    })();
    angular.module("umbraco").controller("CodeEditor.ConfigController", ConfigController);
})(CodeMirror || (CodeMirror = {}));
