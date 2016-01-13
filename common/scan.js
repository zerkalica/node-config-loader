'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('../utils/merge');

var _merge2 = _interopRequireDefault(_merge);

var _scanner = require('../utils/scanner');

var _scanner2 = _interopRequireDefault(_scanner);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _scanner2.default)({ merge: _merge2.default, parser: _parser2.default });
//# sourceMappingURL=scan.js.map