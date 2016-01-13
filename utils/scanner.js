'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeScanner;

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('node-config-loader:scanner:debug');

function basename(p) {
    return _path2.default.basename(p);
}

function makeScanner(_ref) {
    var merge = _ref.merge;
    var parser = _ref.parser;

    return function scanner(files) {
        return Promise.resolve(files).then(function (filteredFiles) {
            debug('filtered: %o', filteredFiles.map(basename));
            return Promise.all(filteredFiles.map(function (file) {
                return (0, _readFile2.default)(file);
            })).then(function (datas) {
                return Promise.all(datas.map(function (contents, i) {
                    return parser({
                        contents: contents,
                        path: filteredFiles[i]
                    });
                }));
            });
        }).then(function (objects) {
            return objects.reduce(function (acc, object) {
                return merge(acc, object);
            }, {});
        });
    };
}
//# sourceMappingURL=scanner.js.map