import jsYaml from 'js-yaml'
import toml from 'toml'

import strategyParser from '../parsers/strategyParser'
import yamlParser from '../parsers/yamlParser'
import tomlParser from '../parsers/tomlParser'
import jsonParser from '../parsers/jsonParser'

const yaml = yamlParser(jsYaml)
const tr = tomlParser(toml)

export default strategyParser({
    'yml': yaml,
    'yaml': yaml,
    'toml': tr,
    'tml': tr,
    'json': jsonParser()
})
