module OurCodeMirror.PrevalueEditors {

    export class AddonsController {
        static $inject: string[] = ["$scope", "$timeout"];

        constructor(private $scope: IAddonsControllerScope, private $timeout: ng.ITimeoutService) {
            if (!angular.isObject($scope.model.value.addons)) {
                $scope.model.value.addons = {};
            }
            console.log($scope);

            $scope.folders = OurCodeMirror.PrevalueEditors.addons;
            $scope.toggle = (folderName: string, addon: IAddon) => {
                var addons = $scope.model.value.addons;
                var index = $scope.indexOf(folderName, addon.alias);

                if (index > -1) {
                    // Remove index
                    addons[folderName].splice(index, 1);

                    // Remove folder if empty
                    if (addons[folderName].length == 0) {
                        delete addons[folderName];
                    }
                } else {
                    // Add folder if it does not exist
                    if (!addons[folderName]) {
                        addons[folderName] = new Array<IAddon>();
                    }
                    // Add addon to folder
                   addons[folderName].push(addon);
                }
            }

            $scope.indexOf = (folderName: string, alias: string): number => {
                var addons = $scope.model.value.addons[folderName];
                if (!addons)
                    return -1;

                for (var i = 0; i < addons.length; i++){
                    if (addons[i].alias == alias)
                        return i;
                }

                return -1;
            }
        }
    }

    /**
     * Default addons by folder
     * @type {Object}
     */
    export var addons: IAddonFolders = {
        "comment": [
            {
                "files": ["comment.js"],
                "alias": "comment",
                "description": "",
                "name": "Comment"
            }
        ],
        "continuelist": [
            {
                "files": [ "continuelist.js"],
                "name": "continuelist",
                "alias": "continuelist",
                "description": ""
            }
        ],
        "mode": [
            {
                "files": ["loadmode.js"],
                name: "Loadmode",
                alias: "loadmode",
                description: ""
            },
            {
                files: ["overlay.js"],
                alias: "overlay",
                name: "Overlay",
                description: ""
            }
        ]
    }

    angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.AddonsController", AddonsController);

    interface IAddonsControllerScope extends IPrevalueScope {
        folders: IAddonFolders;
        toggle: Function;
        indexOf: Function;
    }
}

declare module OurCodeMirror.PrevalueEditors {
    interface IAddonFolders {
        [name: string]: IAddon[];
    }

    interface IAddon {
        alias: string;
        name: string;
        description: string;
        files: string[];
    }
}