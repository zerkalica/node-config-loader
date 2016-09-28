// @flow

import type {FileRec, Parser} from '../interfaces'

/**
 * BinaryMuse toml adapter
 *
 * @see  https://github.com/BinaryMuse/toml-node
 * @param  {Toml} Toml toml parser
 */
export default function makeTomlParser(Toml: Object): Parser {
    return function tomlParser(file: FileRec): Object {
        return new Promise(resolve => {
            resolve(Toml.parse(file.contents.toString()))
        })
        .catch(e => {
            e.message = file.path + ', line ' + e.line + ', column ' + e.column + ': ' + e.message
            throw e
        })
    }
}
