'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _toml2 = require('toml');

var _toml3 = _interopRequireDefault(_toml2);

var _strategyParser = require('../parsers/strategyParser');

var _strategyParser2 = _interopRequireDefault(_strategyParser);

var _yamlParser = require('../parsers/yamlParser');

var _yamlParser2 = _interopRequireDefault(_yamlParser);

var _tomlParser = require('../parsers/tomlParser');

var _tomlParser2 = _interopRequireDefault(_tomlParser);

var _jsonParser = require('../parsers/jsonParser');

var _jsonParser2 = _interopRequireDefault(_jsonParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _yaml = (0, _yamlParser2.default)(_jsYaml2.default);
var _toml = (0, _tomlParser2.default)(_toml3.default);

exports.default = (0, _strategyParser2.default)({
    yml: _yaml,
    yaml: _yaml,
    tml: _toml,
    toml: _toml,
    json: (0, _jsonParser2.default)()
});
//# sourceMappingURL=parser.js.map