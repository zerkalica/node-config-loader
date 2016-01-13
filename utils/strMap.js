'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = strMap;
function strMap(strs, templateArgs) {
    return Object.keys(templateArgs).reduce(function (str, key) {
        return str.replace(new RegExp('{' + key + '}', 'g'), templateArgs[key]);
    }, strs);
}
//# sourceMappingURL=strMap.js.map