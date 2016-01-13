'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodePromisify = require('./nodePromisify');

var _nodePromisify2 = _interopRequireDefault(_nodePromisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _nodePromisify2.default)(_fs2.default.readFile, _fs2.default);
//# sourceMappingURL=readFile.js.map