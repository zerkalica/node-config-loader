"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = nodePromisify;
var slice = Array.prototype.slice;

function nodePromisify(fn) {
    var self = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    return function promised() {
        var args = slice.call(arguments);
        return new Promise(function (resolve, reject) {
            function cb(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
            fn.apply(self, args.concat([cb]));
        });
    };
}
//# sourceMappingURL=nodePromisify.js.map