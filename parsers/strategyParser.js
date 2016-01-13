'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeStrategyParser;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * StrategyAdapter
 * @param {Adapter[file_extension]} adapters
 */
function makeStrategyParser() {
    var adapters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return function strategyParser(file) {
        var ext = _path2.default.extname(file.path).substring(1);

        return new Promise(function (resolve, reject) {
            if (!adapters[ext]) {
                reject(new Error(file.path + ': adapter not found for file ext ' + ext));
            } else {
                return resolve(adapters[ext](file));
            }
        });
    };
}
//# sourceMappingURL=strategyParser.js.map