module CodeMirror {
    export var modeURL: string;
    CodeMirror.modeURL = "/App_Plugins/CodeMirror/components/codemirror/mode/%N/%N.js";

    export class FileEditor implements IFile {
        public name: string;
        public text: string;
        public config: CodeMirror.EditorConfiguration;

        constructor(config: IPrevalueConfiguration) {
            this.name = "";
            this.text = "";
            this.config = config;
        }
    }

}
// Add the directive to umbraco
angular.module("umbraco").requires.push("ui.codemirror");