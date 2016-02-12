var CodeEditor;
(function (CodeEditor) {
    var FileEditor = (function () {
        function FileEditor() {
            var _this = this;
            this.toggleAutoHeight = function () {
                if (_this.config.viewportMargin == Infinity) {
                    _this.config.viewportMargin = CodeMirror.defaults.viewportMargin;
                }
                else {
                    _this.config.viewportMargin = Infinity;
                }
            };
            this.name = "";
            this.text = "";
            this.config = defaultConfig;
        }
        return FileEditor;
    })();
    CodeEditor.FileEditor = FileEditor;
    var defaultConfig = {
        lineNumbers: true,
        lineWrapping: false,
        indentWithTabs: false,
        tabSize: 4,
        viewportMargin: 10
    };
})(CodeEditor || (CodeEditor = {}));
angular.module("umbraco").requires.push("ui.codemirror");
