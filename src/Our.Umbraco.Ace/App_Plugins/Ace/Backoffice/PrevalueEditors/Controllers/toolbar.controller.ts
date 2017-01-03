module OurCodeMirror.PrevalueEditors {
    export class ToolbarController implements IToolbarController {
        static $inject: string[] = ["$scope", "dialogService", "assetsService"];

        private editor: CodeMirror.Editor;

        constructor(private $scope: IToolbarControllerScope,
            private dialogService: umb.services.IDialogService,
            private assetsService: umb.services.IAssetsService) {

            var defaults: CodeMirror.EditorConfiguration = {
                mode: "javascript",
                lineNumbers: true,
                matchBrackets: true,
                viewportMargin: Infinity
            }

            $scope.options = defaults;

            if (!angular.isObject($scope.model.value)) {
                $scope.model.value = {
                    tools: null
                };
            }

            if (!angular.isArray($scope.model.value.tools)) {
                $scope.model.value.tools = [];
            }

            $scope.addTool = () => {
                $scope.toolOverlay = {
                    view: "/App_Plugins/CodeMirror/Backoffice/PrevalueEditors/Overlays/tool.html",
                    title: "Tool settings",
                    show: true,
                    tool: {
                        name: "",
                        action: "",
                        className: "",
                        shortcut: ""
                    },
                    submit: function (model) {
                        $scope.model.value.tools.push(model.tool);

                        $scope.toolOverlay.show = false;
                        $scope.toolOverlay = null;
                    },
                    close: function (oldModel) {
                        $scope.toolOverlay.show = false;
                        $scope.toolOverlay = null;
                    }
                };
            }

            $scope.deleteTool = ($index) => {
                $scope.model.value.tools.splice($index, 1);
            }

            $scope.editTool = ($index: number) => {
                var tool = $scope.model.value.tools[$index];
                $scope.toolOverlay = {
                    view: "/App_Plugins/CodeMirror/Backoffice/PrevalueEditors/Overlays/tool.html",
                    title: "Tool settings",
                    show: true,
                    tool: tool,
                    submit: function (model) {
                        $scope.model.value.tools[$index] = model.tool;

                        $scope.toolOverlay.show = false;
                        $scope.toolOverlay = null;
                    },
                    close: function (oldModel) {
                        $scope.model.value.tools[$index] = oldModel.tool;

                        $scope.toolOverlay.show = false;
                        $scope.toolOverlay = null;
                    }
                };
            }

            $scope.$on('codemirror', (event, editor) => {
                this.editor = editor;
                CodeMirror.autoLoadMode(this.editor, defaults.mode);
            });
        }
    }

    angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.ToolbarController", ToolbarController);

    interface IToolbarController {

    }

    interface IToolbarControllerScope extends ng.IScope {
        model: { value: IToolbar; };
        options: CodeMirror.EditorConfiguration;

        // Methods
        addTool: () => void;
        deleteTool: ($index: number) => void;
        editTool: ($index: number) => void;

        addAction: (actionName: string) => void;
        deleteAction: (actionName: string) => void;

        toolOverlay: IToolOverlayOptions;
    }

    interface IToolOverlayOptions extends umb.directives.IOverlayGeneralOptions<IToolOverlayOptions> {
        tool: ITool;
    }
}
