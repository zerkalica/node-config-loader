#node-config-loader

Scan directories and loads json and yaml files.

``` javascript
var ConfigLoader = require('node-config-loader');

ConfigLoader({env: 'dev', project: 'app1'})
	.addConfigPath(__dirname + '/config')
	.load(function (config) {
		
	});
```

