var Bootstrap;
(function (Bootstrap) {
    "use strict";
    var EditorController = (function () {
        function EditorController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.modes = ["htmlmixed", "css", "xml", "javascript", "markdown"];
            this.promises = [];
            // Query mode scripts
            angular.forEach(this.modes, function (value, index) {
                _this.promises.push(_this.fetchMode(value));
            });
            // Active when done
            $.when.apply(null, this.promises).done(function () {
                _this.activate();
            });
        }
        EditorController.prototype.activate = function () {
            var $scope = this.$scope;
            $scope.modes = this.modes;
            //if ($scope.model.config.modes) {
            //    $scope.modes = this.$scope.model.config.modes.split(',');
            //};
            if (!$scope.model.value) {
                $scope.model.value.code = "function foo() {}";
            }
            ;
            $scope.editorOptions = {
                lineNumbers: $scope.model.config.lineNumbers == "1",
                lineWrapping: $scope.model.config.lineWrapping == "1",
                indentWithTabs: $scope.model.config.indentWithTabs == "",
                tabSize: parseInt($scope.model.config.tabSize) || 4,
                mode: "htmlmixed"
            };
        };
        EditorController.prototype.selectMode = function (mode) {
        };
        EditorController.prototype.fetchMode = function (mode) {
            var $scope = this.$scope;
            return $.getScript("/App_Plugins/CodeMirror/Assets/CodeMirror/mode/" + mode + "/" + mode + ".js")
                .then(function () {
                // Success
                console.log("Loaded: ", mode);
            }, function () {
                // Error
            });
        };
        EditorController.$inject = ["$scope"];
        return EditorController;
    })();
    var app = angular.module("umbraco");
    app.requires.push("ui.codemirror");
    app.controller("CodeMirror.EditorController", EditorController);
})(Bootstrap || (Bootstrap = {}));
//# sourceMappingURL=code-controller.js.map