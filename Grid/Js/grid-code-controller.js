var Bootstrap;
(function (Bootstrap) {
    var Grid;
    (function (Grid) {
        "use strict";
        var GridController = (function () {
            function GridController($scope) {
                this.$scope = $scope;
            }
            GridController.$inject = ["$scope"];
            return GridController;
        })();
        var app = angular.module("umbraco");
        app.requires.push("ui.codemirror");
        app.controller("CodeMirror.Grid.CodeMirrorController", GridController);
    })(Grid = Bootstrap.Grid || (Bootstrap.Grid = {}));
})(Bootstrap || (Bootstrap = {}));
//# sourceMappingURL=grid-code-controller.js.map