var CodeMirror;
(function (CodeMirror) {
    "use strict";
    var GridCodeMirrorController = (function () {
        function GridCodeMirrorController($scope) {
            this.$scope = $scope;
        }
        GridCodeMirrorController.$inject = ["$scope"];
        return GridCodeMirrorController;
    })();
    angular.module("umbraco").controller("CodeMirror.GridController", GridCodeMirrorController);
})(CodeMirror || (CodeMirror = {}));
