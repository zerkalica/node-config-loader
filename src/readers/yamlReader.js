/**
 * Nodeca js-yaml adapter
 *
 * @see https://github.com/nodeca/js-yaml
 * @param  {Yaml} Yaml Yaml parser
 */
export default function makeYamlReader(Yaml, options = {}) {
    return function yamlReader(file) {
        return new Promise((resolve, reject) => {
            resolve(Yaml.safeLoad(file.contents.toString(), options))
        }).catch(e => {
            throw new Error(file.path + " \n" + e.message)
        })
    }
}
