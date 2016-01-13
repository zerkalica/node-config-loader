'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getFiles;

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _nodeFilter = require('../filters/nodeFilter');

var _nodeFilter2 = _interopRequireDefault(_nodeFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFiles() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var instance = opts.instance;
    var env = opts.env;
    var hostname = opts.hostname;
    var tagSeparator = opts.tagSeparator;

    return (0, _globby2.default)(opts.mask, _extends({}, opts, { nodir: true })).then((0, _nodeFilter2.default)({ instance: instance, env: env, hostname: hostname, tagSeparator: tagSeparator }));
}
//# sourceMappingURL=getFiles.js.map