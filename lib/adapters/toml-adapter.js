/**
 * BinaryMuse toml adapter
 *
 * @see  https://github.com/BinaryMuse/toml-node
 * @param  {Toml} Toml toml parser
 */
function tomlAdapter(Toml) {
    return function tomlParser(file, cb) {
        var object;
        try {
            object = Toml.parse(file.contents.toString());
            cb(null, object);
        } catch(e) {
            e.message = file.path + ', line ' + e.line + ', column ' + e.column + ': ' + e.message;
            cb(e);
        }
    };
}

module.exports = tomlAdapter;
