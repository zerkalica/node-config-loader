var through = require('through2');
var ConfigFilter = require('./config-filter');

function ConfigVinylFilter(env, project) {
	return through.obj(function (file, enc, cb) {
		if (ConfigFilter(file.path)) {
			this.push(file);
		}
		cb();
	});
}

module.exports = ConfigVinylFilter;
