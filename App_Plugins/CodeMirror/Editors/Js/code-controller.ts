module Bootstrap {
    "use strict";

    interface ICodeMirrorModelValue {
        code: string;
        language: string;
    }

    interface ICodeMirrorModelConfig {
        lineWrapping: string;
        lineNumbers: string;
        indentWithTabs: string;
        tabSize: string;
        modes: string;
    }

    interface ICodeMirrorModel {
        config: ICodeMirrorModelConfig;
        value: ICodeMirrorModelValue;
    }

    interface ICodeMirrorControllerScope extends ng.IScope {
        editorOptions: CodeMirror.EditorConfiguration;
        model: ICodeMirrorModel;
        modes: {};
    }

    interface ICodeMirrorController {
    }

    class EditorController implements ICodeMirrorController {
        static $inject: string[] = ["$scope"];
        modes = ["htmlmixed", "css", "xml", "javascript", "markdown"];
        promises = [];

        constructor(private $scope: ICodeMirrorControllerScope) {

            // Query mode scripts
            angular.forEach(this.modes, (value:string, index: number) => {
                this.promises.push(this.fetchMode(value));
            });

            // Active when done
            $.when.apply(null, this.promises).done(() => {
                this.activate();
            });
        }

        activate() {
            var $scope = this.$scope;
            $scope.modes = this.modes;

            //if ($scope.model.config.modes) {
            //    $scope.modes = this.$scope.model.config.modes.split(',');
            //};

            if (!$scope.model.value) {
                $scope.model.value.code = "function foo() {}";
            };

            $scope.editorOptions = {
                lineNumbers: $scope.model.config.lineNumbers == "1",
                lineWrapping: $scope.model.config.lineWrapping == "1",
                indentWithTabs: $scope.model.config.indentWithTabs == "",
                tabSize: parseInt($scope.model.config.tabSize) || 4,
                mode: "htmlmixed"
            };
        }

        selectMode(mode: string) {
            
        }

        fetchMode(mode: string): JQueryPromise<JQueryXHR> {
            var $scope = this.$scope;

            return $.getScript("/App_Plugins/CodeMirror/Assets/CodeMirror/mode/" + mode + "/" + mode + ".js")
                .then(() => {
                    // Success
                    console.log("Loaded: ", mode);
                },
                () => {
                    // Error
                });
        }
    }
    var app = angular.module("umbraco");
    app.requires.push("ui.codemirror");
    app.controller("CodeMirror.EditorController", EditorController);
}