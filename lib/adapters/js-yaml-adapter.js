/**
 * Nodeca js-yaml adapter
 *
 * @see https://github.com/nodeca/js-yaml
 * @param  {Yaml} Yaml Yaml parser
 */
function jsYamlAdapter(Yaml, options) {
    options = options || {};

    return function yamlParser(file, cb) {
        var object;
        try {
            object = Yaml.safeLoad(file.contents.toString(), options);
            cb(null, object);
        } catch(e) {
            cb(new Error(file.path + " \n" + e.message));
        }
    };
}

module.exports = jsYamlAdapter;
