module CodeMirror {
    "use strict";

    interface IGridCodeMirrorControllerScope extends ng.IScope {
    }

    interface IGridCodeMirrorController {
    }

    class GridCodeMirrorController implements IGridCodeMirrorController {
        static $inject: string[] = ["$scope"];

        constructor(private $scope: IGridCodeMirrorControllerScope) {
            
        }
    }

    angular.module("umbraco").controller("CodeMirror.GridController", GridCodeMirrorController);
}