'use strict';

var _powerAssertRecorder = function _powerAssertRecorder() { var captured = []; function _capt(value, espath) { captured.push({ value: value, espath: espath }); return value; } function _expr(value, args) { var source = { content: args.content, filepath: args.filepath, line: args.line }; if (args.generator) { source.generator = true; } if (args.async) { source.async = true; } return { powerAssertContext: { value: value, events: captured }, source: source }; } return { _capt: _capt, _expr: _expr }; };

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('commonMerger', function () {
    it('should merge server dev environments', function () {
        var testConfig = {
            example: {
                proc: 'example-dev-yaml',
                name: 'test-yaml',
                test: {
                    p2: 444,
                    p3: 534
                },
                test2: {
                    p2: 123
                }
            },
            app1: {
                arr: ['test1', 'test2'],
                proc: 'test-test'
            },
            console: {
                proc: 'test-dev',
                name: 'test'
            }
        };

        return (0, _2.default)({
            mask: [__dirname + '/{config,cfg/a}/**/*.{toml,tml,yaml,yml,json}'],
            instance: 'server',
            env: 'dev',
            hostname: 'testhost',
            tagSeparator: '#'
        }).then(function (loadedConfig) {
            var _rec = _powerAssertRecorder(),
                _rec2 = _powerAssertRecorder();

            _powerAssert2.default.deepEqual(_rec._expr(_rec._capt(loadedConfig, 'arguments/0'), {
                content: 'assert.deepEqual(loadedConfig, testConfig)',
                filepath: 'src/__tests__/commonTest.js',
                line: 39
            }), _rec2._expr(_rec2._capt(testConfig, 'arguments/1'), {
                content: 'assert.deepEqual(loadedConfig, testConfig)',
                filepath: 'src/__tests__/commonTest.js',
                line: 39
            }));
        });
    });

    it('should merge client dev environments', function () {
        var testConfig = {
            example: {
                proc: 'example-dev-yaml',
                name: 'test-yaml',
                test: {
                    p2: 444,
                    p3: 534
                }
            },
            the: {
                test_string: 'You\'ll hate me after this - #'
            }
        };

        return (0, _2.default)({
            mask: [__dirname + '/config/**/*.{toml,tml,yaml,yml,json}'],
            instance: 'client',
            env: 'dev',
            hostname: 'testhost',
            tagSeparator: '#'
        }).then(function (loadedConfig) {
            var _rec3 = _powerAssertRecorder(),
                _rec4 = _powerAssertRecorder();

            _powerAssert2.default.deepEqual(_rec3._expr(_rec3._capt(loadedConfig, 'arguments/0'), {
                content: 'assert.deepEqual(loadedConfig, testConfig)',
                filepath: 'src/__tests__/commonTest.js',
                line: 66
            }), _rec4._expr(_rec4._capt(testConfig, 'arguments/1'), {
                content: 'assert.deepEqual(loadedConfig, testConfig)',
                filepath: 'src/__tests__/commonTest.js',
                line: 66
            }));
        });
    });
});
//# sourceMappingURL=commonTest.js.map