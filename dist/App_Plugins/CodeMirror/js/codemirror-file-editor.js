var CodeMirror;
(function (CodeMirror) {
    CodeMirror.modeURL = "/App_Plugins/CodeMirror/components/codemirror/mode/%N/%N.js";
    var FileEditor = (function () {
        function FileEditor(config) {
            this.name = "";
            this.text = "";
            this.config = config;
        }
        return FileEditor;
    })();
    CodeMirror.FileEditor = FileEditor;
})(CodeMirror || (CodeMirror = {}));
// Add the directive to umbraco
angular.module("umbraco").requires.push("ui.codemirror");
//# sourceMappingURL=codemirror-file-editor.js.map