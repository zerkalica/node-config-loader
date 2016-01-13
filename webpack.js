'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = webpackLoader;

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _findRoot = require('find-root');

var _findRoot2 = _interopRequireDefault(_findRoot);

var _strMap = require('./utils/strMap');

var _strMap2 = _interopRequireDefault(_strMap);

var _getFiles = require('./common/getFiles');

var _getFiles2 = _interopRequireDefault(_getFiles);

var _scan = require('./common/scan');

var _scan2 = _interopRequireDefault(_scan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('node-config-loader:webpackLoader:debug');

function webpackLoader(source) {
    var _this = this;

    if (this.cacheable) {
        this.cacheable();
    }
    var rp = _path2.default.dirname(this.resourcePath);
    var cb = this.async();
    var params = JSON.parse(source);
    var query = _loaderUtils2.default.parseQuery(this.query) || {};
    var opts = _extends({
        nodir: true
    }, params, query, this.options.configLoader || {});

    var templateArgs = _extends({}, process.env, {
        ROOT: (0, _findRoot2.default)(rp),
        DIRNAME: rp,
        PWD: process.cwd()
    });

    opts.mask = opts.mask.map(function (mask) {
        return (0, _strMap2.default)(mask, templateArgs);
    });
    debug('%o', opts);

    if (!cb) {
        throw new Error('node-config-loader can\'t support sync mode');
    }

    (0, _getFiles2.default)(opts).then(function (files) {
        files.forEach(function (file) {
            return _this.addDependency(file);
        });
        return (0, _scan2.default)(files);
    }).then(function (value) {
        _this.value = [value];
        cb(null, 'module.exports = ' + JSON.stringify(value, undefined, '\t') + ';');
    }).catch(function (err) {
        return cb(err);
    });
}
//# sourceMappingURL=webpack.js.map