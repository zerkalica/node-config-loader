exports.mergeStream = require('./lib/config-stream-merger');
exports.Filter = {
	generic: require('./lib/filters/generic-filter')
};
exports.Adapter = {
	toml: require('./lib/adapters/toml-adapter'),
	yaml: require('./lib/adapters/js-yaml-adapter'),
	strategy: require('./lib/adapters/strategy-adapter')
};
