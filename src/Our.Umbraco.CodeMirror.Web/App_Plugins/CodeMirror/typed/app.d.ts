interface IFile {
    name: string;
    text: string;
    config: CodeMirror.EditorConfiguration;
}

interface IModeInfo {
    name: string;
    mode: string;
    mime: string;
    mimes: Array<string>;
    ext: Array<string>;
}

// Meta extentions
declare module CodeMirror {
    /**
     * Gets the mode by file name
     * @param fileName
     */
    function findModeByMIME(mime: string): IModeInfo;
    function findModeByExtension(ext: string): IModeInfo;
    function findModeByFileName(fileName: string): IModeInfo;
    function findModeByName(name: string): IModeInfo;

    var modeInfo: IModeInfo[];

    interface IModeInfo {
        name: string;
        mode: string;
        ext: string[];
        mimes?: string[];
        mime?: string;
        alias?: string[];
        file?: RegExp;
    }
}