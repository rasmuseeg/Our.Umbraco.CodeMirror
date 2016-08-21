var OurCodeMirror;
(function (OurCodeMirror) {
    var CodeMirrorController = (function () {
        function CodeMirrorController($scope, $q, assetsService, $injector) {
            var _this = this;
            this.$scope = $scope;
            this.$q = $q;
            this.assetsService = assetsService;
            this.$injector = $injector;
            this.addonPath = "~/App_Plugins/CodeMirror/Assets/codemirror/addon/";
            this.modePath = "/App_Plugins/CodeMirror/Assets/codemirror/mode/%N/%N.js";
            $scope.ready = false;
            $scope.options = {};
            // Convert mode to string
            if (angular.isObject($scope.model.config.defaults.modeInfo)) {
                $scope.options.mode = $scope.model.config.defaults.modeInfo.mode;
            }
            else {
                $scope.options.mode = $scope.model.config.defaults.modeInfo;
            }
            // Set theme (.cm-s-{name})
            if (angular.isString($scope.model.config.defaults.theme.name)) {
                $scope.options.theme = $scope.model.config.defaults.theme.name;
            }
            this.loadAddonFolders($scope.model.config.defaults.addons)
                .then(function () {
                $scope.ready = true;
            }, function (reason) {
                console.log(reason);
            });
            $scope.$on('codemirror', function (event, editor) {
                _this.cm = editor;
                _this.registerShortcuts(editor, $scope.tools);
            });
            $scope.tools = $scope.model.config.defaults.tools;
            $scope.executeAction = function ($index) {
                _this.executeAction($index);
            };
        }
        /**
         * Converts the tool action to a function and executes.
         * @param {Number} $index
         */
        CodeMirrorController.prototype.executeAction = function ($index) {
            var strAction = this.$scope.tools[$index].action;
            if (typeof strAction === 'string') {
                var r = "return " + strAction;
                var func = new Function(r)();
                this.$injector.invoke(func, null, { "cm": this.cm, "cmCtrl": this });
            }
        };
        /**
         * Converts the tool action to a function and executes.
         * @param {Object} cm
         * @param {Object} tools
         */
        CodeMirrorController.prototype.registerShortcuts = function (cm, tools) {
            var _this = this;
            if (!angular.isObject(this.$scope.options.extraKeys)) {
                this.$scope.options.extraKeys = {};
            }
            angular.forEach(tools, function (value, index) {
                if (value.shortcut) {
                    _this.$scope.options.extraKeys[value.shortcut] = function () {
                        _this.executeAction(index);
                    };
                }
            });
        };
        /**
         * Loads addons in folders
         * @param {Object} addons
         */
        CodeMirrorController.prototype.loadAddonFolders = function (addons) {
            var _this = this;
            var promises = [];
            angular.forEach(addons, function (addons, folder) {
                angular.forEach(addons, function (addon, index) {
                    promises.push(_this.loadAddon(folder, addon));
                });
            });
            return this.$q.all(promises);
        };
        /**
         * Loads an addon in a folder
         * @param {String} folder
         * @param {Object} AddonFolders
         */
        CodeMirrorController.prototype.loadAddon = function (folder, addon) {
            var _this = this;
            var promises = [];
            angular.forEach(addon.files, function (file, index) {
                var path = _this.addonPath + "/" + folder + "/" + file;
                if (file.indexOf('.js') > -1)
                    promises.push(_this.assetsService.loadJs(path, _this.$scope, null, 300));
                else if (file.indexOf('.css') > -1)
                    promises.push(_this.assetsService.loadCss(path, _this.$scope, null, 300));
            });
            return this.$q.all(promises);
        };
        /**
         * Insert a string at cursor position
         * @param  {String} insertion
         */
        CodeMirrorController.prototype.insert = function (insertion) {
            var doc = this.cm.getDoc();
            var cursor = doc.getCursor();
            doc.replaceRange(insertion, { line: cursor.line, ch: cursor.ch });
        };
        /**
         * Insert a string at the start and end of a selection
         * @param {String} start
         * @param {String} end
         */
        CodeMirrorController.prototype.insertAround = function (start, end) {
            var doc = this.cm.getDoc();
            var cursor = doc.getCursor();
            if (doc.somethingSelected()) {
                var selection = doc.getSelection();
                doc.replaceSelection(start + selection + end);
            }
            else {
                // If no selection then insert start and end args and set cursor position between the two.
                doc.replaceRange(start + end, { line: cursor.line, ch: cursor.ch });
                doc.setCursor({ line: cursor.line, ch: cursor.ch + start.length });
            }
        };
        /**
         * Insert a string before a selection
         * @param {String} insertion
         */
        CodeMirrorController.prototype.insertBefore = function (insertion, cursorOffset) {
            var doc = this.cm.getDoc();
            var cursor = doc.getCursor();
            if (doc.somethingSelected()) {
                var selections = doc.listSelections();
                selections.forEach(function (selection) {
                    var pos = [selection.head.line, selection.anchor.line].sort();
                    for (var i = pos[0]; i <= pos[1]; i++) {
                        doc.replaceRange(insertion, { line: i, ch: 0 });
                    }
                    doc.setCursor({ line: pos[0], ch: cursorOffset || 0 });
                });
            }
            else {
                doc.replaceRange(insertion, { line: cursor.line, ch: 0 });
                doc.setCursor({ line: cursor.line, ch: cursorOffset || 0 });
            }
        };
        CodeMirrorController.$inject = ["$scope", "$q", "assetsService", "$injector"];
        return CodeMirrorController;
    }());
    OurCodeMirror.CodeMirrorController = CodeMirrorController;
    angular.module("umbraco").controller("OurCodeMirror.PropertyEditors.CodeMirrorController", CodeMirrorController);
})(OurCodeMirror || (OurCodeMirror = {}));
