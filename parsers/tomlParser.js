'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeTomlParser;
/**
 * BinaryMuse toml adapter
 *
 * @see  https://github.com/BinaryMuse/toml-node
 * @param  {Toml} Toml toml parser
 */
function makeTomlParser(Toml) {
    return function tomlParser(file) {
        return new Promise(function (resolve) {
            resolve(Toml.parse(file.contents.toString()));
        }).catch(function (e) {
            e.message = file.path + ', line ' + e.line + ', column ' + e.column + ': ' + e.message;
            throw e;
        });
    };
}
//# sourceMappingURL=tomlParser.js.map