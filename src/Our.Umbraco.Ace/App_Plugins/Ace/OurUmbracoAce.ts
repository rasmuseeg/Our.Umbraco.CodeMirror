/// <reference types="angular" />
/// <reference types="umbraco" />
/// <reference types="ace" />

namespace OurUmbracoAce {
    angular.module("ourumbracoace", []);
    angular.module("ourumbracoace.controllers", []);
    angular.module("ourumbracoace.directives", []);
}

declare module OurUmbracoAce.PropertyEditors {
    /**
     *
     */
    interface IFile {
        name: string;
        text: string;
        config: AceAjax.
    }
}

declare module OurUmbracoAce.PrevalueEditors {
    interface IPrevalueScope extends ng.IScope {
        model: {
            value: IPrevalueModelValue;
        },
        config: {
            defaults: IPrevalueModelValue;
        }
    }

    interface IPrevalueModelValue {
        options: Ace.EditorConfiguration;
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