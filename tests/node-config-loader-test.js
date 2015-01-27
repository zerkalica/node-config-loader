var expect = require('./test-helpers').expect;
var YAML = require('yamljs');
var ConfigLoader = require('../lib/node-config-loader');

ConfigLoader.Loaders.yaml = ConfigLoader.Loaders.yml = YAML.bind(YAML);

describe('node-config-loader', function () {
	function load(fn) {
		ConfigLoader({env: 'dev', project: 'app1'})
			.addConfigPath(__dirname + '/config')
			.load(fn);
	}

	it('should load all and dev environment', function () {
		var a = [];

		load(function (config) {
			a.push(config);
		});
		expect(a[0].app1.proc).to.be.equal('test-test');
		expect(a[1].example.proc).to.be.equal('example-dev');
	});
});
