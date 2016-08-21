var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var KeyMapController = (function () {
            function KeyMapController(scope) {
                this.scope = scope;
            }
            KeyMapController.$inject = [];
            return KeyMapController;
        }());
        PrevalueEditors.KeyMapController = KeyMapController;
        angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.KeymapsController", KeyMapController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));
