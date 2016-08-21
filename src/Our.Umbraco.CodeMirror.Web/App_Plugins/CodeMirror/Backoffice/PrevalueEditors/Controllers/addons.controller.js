var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var AddonsController = (function () {
            function AddonsController($scope, $timeout) {
                this.$scope = $scope;
                this.$timeout = $timeout;
                if (!angular.isObject($scope.model.value.addons)) {
                    $scope.model.value.addons = {};
                }
                console.log($scope);
                $scope.folders = OurCodeMirror.PrevalueEditors.addons;
                $scope.toggle = function (folderName, addon) {
                    var addons = $scope.model.value.addons;
                    var index = $scope.indexOf(folderName, addon.alias);
                    if (index > -1) {
                        // Remove index
                        addons[folderName].splice(index, 1);
                        // Remove folder if empty
                        if (addons[folderName].length == 0) {
                            delete addons[folderName];
                        }
                    }
                    else {
                        // Add folder if it does not exist
                        if (!addons[folderName]) {
                            addons[folderName] = new Array();
                        }
                        // Add addon to folder
                        addons[folderName].push(addon);
                    }
                };
                $scope.indexOf = function (folderName, alias) {
                    var addons = $scope.model.value.addons[folderName];
                    if (!addons)
                        return -1;
                    for (var i = 0; i < addons.length; i++) {
                        if (addons[i].alias == alias)
                            return i;
                    }
                    return -1;
                };
            }
            AddonsController.$inject = ["$scope", "$timeout"];
            return AddonsController;
        }());
        PrevalueEditors.AddonsController = AddonsController;
        /**
         * Default addons by folder
         * @type {Object}
         */
        PrevalueEditors.addons = {
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
                    "files": ["continuelist.js"],
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
        };
        angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.AddonsController", AddonsController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
