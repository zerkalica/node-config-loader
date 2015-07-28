'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = yamlScan;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _utilsMerge = require('../utils/merge');

var _utilsMerge2 = _interopRequireDefault(_utilsMerge);

var _utilsScanner = require('../utils/scanner');

var _utilsScanner2 = _interopRequireDefault(_utilsScanner);

var _readersStrategyReader = require('../readers/strategyReader');

var _readersStrategyReader2 = _interopRequireDefault(_readersStrategyReader);

var _readersYamlReader = require('../readers/yamlReader');

var _readersYamlReader2 = _interopRequireDefault(_readersYamlReader);

var _readersRequireReader = require('../readers/requireReader');

var _readersRequireReader2 = _interopRequireDefault(_readersRequireReader);

var _filtersNodeFilter = require('../filters/nodeFilter');

var _filtersNodeFilter2 = _interopRequireDefault(_filtersNodeFilter);

function yamlScan(_ref) {
    var _ref$instance = _ref.instance;
    var instance = _ref$instance === undefined ? 'server' : _ref$instance;
    var _ref$env = _ref.env;
    var env = _ref$env === undefined ? process.env.NODE_ENV : _ref$env;
    var _ref$hostname = _ref.hostname;
    var hostname = _ref$hostname === undefined ? _os2['default'].hostname() : _ref$hostname;
    var _ref$tagSeparator = _ref.tagSeparator;
    var tagSeparator = _ref$tagSeparator === undefined ? '#' : _ref$tagSeparator;

    return (0, _utilsScanner2['default'])({
        filter: (0, _filtersNodeFilter2['default'])({
            instance: instance,
            env: env,
            hostname: hostname,
            tagSeparator: tagSeparator
        }),
        readFile: (0, _readersStrategyReader2['default'])({
            'yml': (0, _readersYamlReader2['default'])(_jsYaml2['default']),
            'json': (0, _readersRequireReader2['default'])()
        }),
        merge: _utilsMerge2['default']
    });
}

module.exports = exports['default'];
//# sourceMappingURL=yamlScan.js.map