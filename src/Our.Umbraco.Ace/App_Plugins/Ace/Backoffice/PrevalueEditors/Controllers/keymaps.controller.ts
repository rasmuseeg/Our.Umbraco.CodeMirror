module OurCodeMirror.PrevalueEditors {
    interface KeyMapScope extends ng.IScope {
        keymaps
    }

    interface IKeyMaps {
        [name: string]: string;
    }

    export class KeyMapController {
        static $inject = [];
        constructor(private scope: ng.IScope) {
        }
    }

    export var presets: {
        "emac": {
            alias: "emacs.js",
            name: "",
            description: ""
        },
        "sublime": {
            alias: "sublime.js",
            name: "sublime",
            description: ""
        },
        "vim": {
            alias: "vim.js",
            name: "vim",
            description: ""
        }
    }

    angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.KeymapsController", KeyMapController);
}