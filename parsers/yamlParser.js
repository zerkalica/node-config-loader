'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeYamlParser;
/**
 * Nodeca js-yaml adapter
 *
 * @see https://github.com/nodeca/js-yaml
 * @param  {Yaml} Yaml Yaml parser
 */
function makeYamlParser(Yaml) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return function yamlParser(file) {
        return new Promise(function (resolve) {
            resolve(Yaml.safeLoad(file.contents.toString(), options));
        }).catch(function (e) {
            throw new Error(file.path + ' \n' + e.message);
        });
    };
}
//# sourceMappingURL=yamlParser.js.map