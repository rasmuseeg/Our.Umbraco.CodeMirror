module Bootstrap.Grid {
    "use strict";

    interface ICodeMirrorControllerScope extends ng.IScope {
    }

    interface ICodeMirrorController {
    }

    class GridController implements ICodeMirrorController {
        static $inject: string[] = ["$scope"];

        constructor(private $scope: ICodeMirrorControllerScope) {
        }
    }
    var app = angular.module("umbraco");
    app.requires.push("ui.codemirror");
    app.controller("CodeMirror.Grid.CodeMirrorController", GridController);
}