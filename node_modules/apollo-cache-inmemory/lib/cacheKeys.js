var CacheKeyNode = (function () {
    function CacheKeyNode() {
        this.children = null;
        this.key = null;
    }
    CacheKeyNode.prototype.lookup = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.lookupArray(args);
    };
    CacheKeyNode.prototype.lookupArray = function (array) {
        var node = this;
        array.forEach(function (value) {
            node = node.getOrCreate(value);
        });
        return node.key || (node.key = Object.create(null));
    };
    CacheKeyNode.prototype.getOrCreate = function (value) {
        var map = this.children || (this.children = new Map());
        var node = map.get(value);
        if (!node) {
            map.set(value, (node = new CacheKeyNode()));
        }
        return node;
    };
    return CacheKeyNode;
}());
export { CacheKeyNode };
//# sourceMappingURL=cacheKeys.js.map