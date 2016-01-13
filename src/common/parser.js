import yaml from 'js-yaml'
import toml from 'toml'

import strategyParser from '../parsers/strategyParser'
import yamlParser from '../parsers/yamlParser'
import tomlParser from '../parsers/tomlParser'
import jsonParser from '../parsers/jsonParser'

const _yaml = yamlParser(yaml)
const _toml = tomlParser(toml)

export default strategyParser({
    yml: _yaml,
    yaml: _yaml,
    tml: _toml,
    toml: _toml,
    json: jsonParser()
})
