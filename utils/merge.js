'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = merge;
function mergeToTarget(target, src) {
    var keys = Object.keys(src);
    for (var i = 0, j = keys.length; i < j; i++) {
        var key = keys[i];
        var val = src[key];
        if (val !== undefined) {
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null) {
                if (Array.isArray(val)) {
                    target[key] = [].concat(val);
                } else {
                    if (!target[key]) {
                        target[key] = {};
                    }
                    mergeToTarget(target[key], val);
                }
            } else {
                target[key] = val;
            }
        }
    }

    return target;
}

function merge() {
    var objects = Array.prototype.slice.call(arguments);
    var dest = {};
    for (var i = 0, j = objects.length; i < j; i++) {
        mergeToTarget(dest, objects[i]);
    }

    return dest;
}
//# sourceMappingURL=merge.js.map