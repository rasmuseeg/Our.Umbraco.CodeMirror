var CodeEditor;
(function (CodeEditor) {
    "use strict";
    var GridCodeEditorController = (function () {
        function GridCodeEditorController($scope) {
            this.$scope = $scope;
        }
        GridCodeEditorController.$inject = ["$scope"];
        return GridCodeEditorController;
    })();
    angular.module("umbraco").controller("CodeMirrorEditors.GridCodeEditorController", GridCodeEditorController);
})(CodeEditor || (CodeEditor = {}));
