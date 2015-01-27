var ConfigFilter = require('./config-filter');
var path = require('path');
var fs = require('fs');

var Loaders = {
	json: require
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
	fs.readdir(configPath, function (err, files) {
		files
			.filter(ConfigFilter(this._env. this._project))
			.forEach(function (fileName) {
				var fullPath = path.join(configPath, fileName);
				var ext = path.extname(fileName);
				var loader = this._Loaders[ext.substring(1)];
				cb(loader(fullPath));
			});
	});

	return data;
};

proto.addConfigPath = function addConfigPath(path) {
	this._paths.push(path);
	return this;
};

proto.load = function load(cb) {
	this._paths.forEach(function (dir) {
		this._getConfigData(dir, cb);
	}.bind(this));

	return this;
};

module.exports = ConfigLoader;
