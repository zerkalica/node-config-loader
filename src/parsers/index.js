// @flow

import yaml from 'js-yaml'
import toml from 'toml'

import strategyParser from './strategyParser'
import yamlParser from './yamlParser'
import tomlParser from './tomlParser'
import jsonParser from './jsonParser'
import jsParser from './jsParser'

const _yaml = yamlParser(yaml)
const _toml = tomlParser(toml)

export default strategyParser({
    yml: _yaml,
    yaml: _yaml,
    tml: _toml,
    toml: _toml,
    json: jsonParser(),
    js: jsParser()
})
