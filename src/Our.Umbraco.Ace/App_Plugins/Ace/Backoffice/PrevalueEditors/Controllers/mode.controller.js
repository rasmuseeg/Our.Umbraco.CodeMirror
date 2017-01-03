var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var ModeController = (function () {
            function ModeController($scope) {
                this.$scope = $scope;
                $scope.modes = CodeMirror.modeInfo;
            }
            ModeController.$inject = ["$scope"];
            return ModeController;
        }());
        PrevalueEditors.ModeController = ModeController;
        angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.ModeController", ModeController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
