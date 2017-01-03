module OurCodeMirror.PrevalueEditors {
    interface IThemeController {

    }

    interface IThemeControllerScope extends IPrevalueScope {
        name: string;
        css: string;

        rename: (newName: string) => void;
    }
    export class ThemeController implements IThemeController {
        static $inject: string[] = ["$scope"];
        constructor(private $scope: IThemeControllerScope) {

            //var oldName = $scope.name;
            //$scope.rename = (newName: string) => {
            //    var search = new RegExp('(.cm-s-)([A-Za-z0-9\-\_]+)', 'g');
            //    var replacement = '$1' + newName;
            //    $scope.css.replace(search, replacement);
            //    oldName = newName; // Set old name to new name
            //}

            $scope.$watch('model.value.theme.name', (newName, oldName) => {
                var search = new RegExp('(.cm-s-)(' + oldName + ')[\.|\s|\#]', 'g');
                var replacement = '$1' + newName;
                var style = $scope.model.value.theme.style;
                $scope.model.value.theme.style = style.replace(search, replacement);
            }, true);
        }
    }
    angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.ThemeController", ThemeController);
}