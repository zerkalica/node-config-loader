var path = require('path');

function GenericFilter(fileName, options) {
    var env = options.env;
    var target = options.target;
    if (fileName.indexOf('.disabled') !== -1) {
        return false;
    }
    var ext = path.extname(fileName);
    var parts = path.basename(fileName, ext).split('.');

    if (parts.length !== 2) {
        throw new Error('Config filename format: name[#target].environment.ext, but given: ' + fileName + '.');
    }
    var rec = parts[0].split('#');
    var isTarget = rec.length === 2;
    var c = {
        configName: rec[isTarget ? 1 : 0],
        target: isTarget ? rec[1] : 'all',
        env: parts[1] || 'all'
    };

    return (c.target === 'all' || c.target === target) && (c.env === 'all' || c.env == env);
}

module.exports = GenericFilter;
