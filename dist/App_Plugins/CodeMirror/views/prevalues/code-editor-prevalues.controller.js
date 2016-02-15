var CodeMirrorEditors;
(function (CodeMirrorEditors) {
    var CodeEditorConfigController = (function () {
        function CodeEditorConfigController($scope) {
            this.$scope = $scope;
            if (!$scope.model.value) {
                $scope.model.value = {};
            }
            $scope.modes = CodeMirror.modeInfo;
        }
        CodeEditorConfigController.$inject = ["$scope", "$timeout"];
        return CodeEditorConfigController;
    })();
})(CodeMirrorEditors || (CodeMirrorEditors = {}));
