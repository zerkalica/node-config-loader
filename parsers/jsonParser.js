'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeJsonParser;
function makeJsonParser() {
    return function jsonParser(file) {
        return new Promise(function (resolve) {
            resolve(JSON.parse(file.contents.toString()));
        }).catch(function (e) {
            e.message = file.path + ': ' + e.message;
            throw e;
        });
    };
}
//# sourceMappingURL=jsonParser.js.map