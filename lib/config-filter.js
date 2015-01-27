var path = require('path');

function ConfigFilter(env, project) {
	return function isActualFile(fileName) {
		if (fileName.indexOf('.disabled') !== -1) {
			return false;
		}
		var ext = path.extname(fileName);
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

		return (c.project === 'all' || c.project === project) && (c.env === 'all' || c.env == env);
	};
}
