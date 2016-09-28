// @flow

import type {FileRec, Parser} from '../interfaces'

/**
 * Nodeca js-yaml adapter
 *
 * @see https://github.com/nodeca/js-yaml
 * @param  {Yaml} Yaml Yaml parser
 */
export default function makeYamlParser(
    Yaml: Object,
    options?: Object = {}
): Parser {
    return function yamlParser(file: FileRec): Object {
        return new Promise(resolve => {
            resolve(Yaml.safeLoad(file.contents.toString(), options))
        }).catch(e => {
            throw new Error(file.path + ' \n' + e.message)
        })
    }
}
