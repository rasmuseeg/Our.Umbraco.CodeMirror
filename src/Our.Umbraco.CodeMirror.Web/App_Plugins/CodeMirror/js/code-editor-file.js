var CodeMirror;
(function (CodeMirror) {
    CodeMirror.defaultConfig = {
        lineNumbers: true,
        lineWrapping: false,
        indentWithTabs: false,
        tabSize: 4,
        viewportMargin: 10
    };
    var File = (function () {
        function File() {
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
            this.config = CodeMirror.defaultConfig;
        }
        return File;
    })();
    CodeMirror.File = File;
})(CodeMirror || (CodeMirror = {}));
// Add the directive to umbraco
angular.module("umbraco").requires.push("ui.codemirror");
