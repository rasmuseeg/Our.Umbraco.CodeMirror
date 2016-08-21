var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var ThemeController = (function () {
            function ThemeController($scope) {
                //var oldName = $scope.name;
                //$scope.rename = (newName: string) => {
                //    var search = new RegExp('(.cm-s-)([A-Za-z0-9\-\_]+)', 'g');
                //    var replacement = '$1' + newName;
                //    $scope.css.replace(search, replacement);
                //    oldName = newName; // Set old name to new name
                //}
                this.$scope = $scope;
                $scope.$watch('model.value.theme.name', function (newName, oldName) {
                    var search = new RegExp('(.cm-s-)(' + oldName + ')[\.|\s|\#]', 'g');
                    var replacement = '$1' + newName;
                    var style = $scope.model.value.theme.style;
                    $scope.model.value.theme.style = style.replace(search, replacement);
                }, true);
            }
            ThemeController.$inject = ["$scope"];
            return ThemeController;
        }());
        PrevalueEditors.ThemeController = ThemeController;
        angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.ThemeController", ThemeController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
