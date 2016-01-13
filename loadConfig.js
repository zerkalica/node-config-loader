'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadConfig;

var _getFiles = require('./common/getFiles');

var _getFiles2 = _interopRequireDefault(_getFiles);

var _scan = require('./common/scan');

var _scan2 = _interopRequireDefault(_scan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadConfig(opts) {
    return (0, _getFiles2.default)(opts).then(_scan2.default);
}
//# sourceMappingURL=loadConfig.js.map