module OurCodeMirror.PrevalueEditors {
    interface IModeController {

    }

    interface IModeControllerScope extends IPrevalueScope {
        modes: CodeMirror.IModeInfo[];

        isSelected: (mode: any) => boolean;
        select: (mode: any) => void;
    }
    export class ModeController implements IModeController {
        static $inject: string[] = ["$scope"];
        constructor(private $scope: IModeControllerScope) {
            $scope.modes = CodeMirror.modeInfo;
        }
    }
    angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.ModeController", ModeController);
}