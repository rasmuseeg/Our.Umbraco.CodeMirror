

declare module OurCodeMirror.PropertyEditors {
    /**
     *
     */
    interface IFile {
        name: string;
        text: string;
        config: CodeMirror.EditorConfiguration;
    }
}

declare module OurCodeMirror.PrevalueEditors {
    interface IPrevalueScope extends ng.IScope {
        model: {
            value: IPrevalueModelValue;
        },
        config: {
            defaults: IPrevalueModelValue;
        }
    }

    interface IPrevalueModelValue {
        options: CodeMirror.EditorConfiguration;
        modeInfo: any;
        tools: ITool[];
        addons: IAddonFolders;
        theme: ITheme;
    }

    /**
     *
     */
    export interface IToolbar {
        tools: ITool[];
    }

    /**
     *
     */
    export interface ITool {
        name: string;
        action: string;
        className: string;
        shortcut?: string;
    }

    /**
     *
     */
    export interface ITheme {
        name: string;
        style: string;
    }

    /**
     *
     */
    export interface IActionsAsStrings {
        [name: string]: string;
    }

    /**
     *
     */
    interface IKeyMappings {
        [name: string]: string;
    }
}