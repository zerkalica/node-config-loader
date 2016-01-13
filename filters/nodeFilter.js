'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultTemplates = undefined;
exports.default = makeNodeFilter;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _strMap = require('../utils/strMap');

var _strMap2 = _interopRequireDefault(_strMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTemplates = exports.defaultTemplates = ['default', 'default-{instance}', '{deployment}', '{deployment}-{instance}', '{hostname}', '{hostname}-{instance}', '{hostname}-{deployment}', '{hostname}-{deployment}-{instance}', 'local', 'local-{instance}', 'local-{deployment}', 'local-{deployment}-{instance}'];

function subStrFrom(str, fromStr) {
    return str.substring(str.indexOf(fromStr) + 1);
}

function makeNodeFilter(_ref) {
    var _ref$instance = _ref.instance;
    var instance = _ref$instance === undefined ? 'main' : _ref$instance;
    var _ref$hostname = _ref.hostname;
    var hostname = _ref$hostname === undefined ? _os2.default.hostname() : _ref$hostname;
    var _ref$tagSeparator = _ref.tagSeparator;
    var tagSeparator = _ref$tagSeparator === undefined ? '#' : _ref$tagSeparator;
    var _ref$env = _ref.env;
    var env = _ref$env === undefined ? process.env.NODE_ENV : _ref$env;
    var _ref$templates = _ref.templates;
    var templates = _ref$templates === undefined ? defaultTemplates : _ref$templates;

    var filesTemplates = templates.map(function (template) {
        return (0, _strMap2.default)(template, {
            hostname: hostname,
            deployment: env,
            instance: instance
        });
    });

    function normalize(relFile) {
        return subStrFrom(_path2.default.basename(relFile, _path2.default.extname(relFile)), tagSeparator);
    }

    return function nodeFilter(relFiles) {
        return filesTemplates.reduce(function (acc, template) {
            return acc.concat(relFiles.filter(function (relFile) {
                return normalize(relFile) === template;
            }));
        }, []);
    };
}
//# sourceMappingURL=nodeFilter.js.map