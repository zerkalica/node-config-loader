var YAML = require('yamljs');
var path = require('path');
var fs = require('fs');

var Loaders = {
	json: require,
	yml:  YAML.load.bind(YAML),
	yaml: YAML.load.bind(YAML)
};

function ConfigLoader(options) {
	if (!(this instanceof ConfigLoader)) {
		return new ConfigLoader(options);
	}

	options = options || {};
	this._env = options.env || 'dev';
	this._project = options.project || 'all';
	this._Loaders = options.loaders || ConfigLoader.Loaders;
	this._paths = [];
}
ConfigLoader.Loaders = Loaders;
var proto = ConfigLoader.prototype;

proto.addLoader = function addLoader(name, loader) {
	this._Loaders[name] = loader;
	return this;
};

proto._getConfigData = function _getConfigData(configPath, cb) {
	var data = [];
	fs.readdirSync(configPath).forEach(function addConfig(fileName) {
		var ext = path.extname(fileName);
		var loader = this._Loaders[ext.substring(1)];
		if (!loader || fileName.indexOf('.disabled') !== -1) {
			return;
		}

		var parts = path.basename(fileName, ext).split('.');
		if (parts.length !== 2) {
			throw new Error('config format [project#]name.environment.(yml|json), given: ' + fileName);
		}
		var rec = parts[0].split('#');
		var isProject = rec.length === 2;
		var c = {
			configName: rec[isProject ? 1 : 0],
			project: isProject ? rec[0] : 'all',
			env: parts[1] || 'all'
		};

		var isActual = (
			(c.project === 'all' || c.project === this._project)
			&& (c.env === 'all' || c.env == this._env)
		);

		if (isActual) {
			cb(loader(path.join(configPath, fileName)));
		}
	}.bind(this));

	return data;
}

proto.addConfigPath = function addConfigPath(path) {
	this._paths.push(path);
	return this;
}
proto.load = function load(cb) {
	this._paths.forEach(function (dir) {
		this._getConfigData(dir, cb);
	}.bind(this));

	return this;
}

module.exports = ConfigLoader;
