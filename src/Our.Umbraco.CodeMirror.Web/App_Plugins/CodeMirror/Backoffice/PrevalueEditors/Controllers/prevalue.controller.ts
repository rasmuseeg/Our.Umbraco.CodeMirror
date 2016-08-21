module OurCodeMirror.PrevalueEditors {

    export class PrevalueController {
        constructor($scope: IPrevalueScope) {
            if (!angular.isObject($scope.model.value)) {
                $scope.model.value = <any>{};
            }

            if (!angular.isObject($scope.model.value.options)) {
                $scope.model.value.options = <any>{};
            }

            $scope.config = {
                defaults: $scope.model.value
            };
        }
    }

    angular.module("umbraco").controller("OurCodeMirror.PropertyEditors.PrevalueController", PrevalueController);
}