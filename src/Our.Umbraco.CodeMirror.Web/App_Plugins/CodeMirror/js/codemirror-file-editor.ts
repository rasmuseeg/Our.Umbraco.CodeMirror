module CodeMirror {
    export var modeURL: string;
    CodeMirror.modeURL = "/App_plugins/CodeMirror/components/codemirror/mode/%N/%N.js";

    export class FileEditor implements IFile {
        public name: string;
        public text: string;
        public config: CodeMirror.EditorConfiguration;

        constructor(config: IPrevalueConfiguration) {
            this.name = "";
            this.text = "";
            this.config = config;
        }

        

        //changeMode = () => {
        //    // wait for user to finish typing
        //    this.$timeout.cancel(timeout);
        //    timeout = $timeout(() => {
        //        var file = this.$scope.model.value;
        //        var modeInfo = CodeMirror.findModeByFileName(file.name);
        //
        //        if (modeInfo != null && modeInfo.mode != null) {
        //            file.config.mode = modeInfo;
        //        } else {
        //            file.config.mode = null;
        //        }
        //    }, 700);
        //}
    }

}
// Add the directive to umbraco
angular.module("umbraco").requires.push("ui.codemirror");