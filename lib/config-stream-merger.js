var through2 = require('through2');
var path = require('path');
var extend = require('./extmerge');
var ConfigFilter = require('./filters/generic-filter');

function configStreamMerger(options) {
    var joinedFile;
    options = options || {};
    var state = {};
    var parser = options.parser;
    var fileName = options.fileName;
    var merge = options.merge || extend;
    var isActualFile = options.filter || ConfigFilter;

    return through2.obj(function (file, enc, cb) {
        if (!joinedFile) joinedFile = file.clone({contents: false});
        if (isActualFile(file.path, options)) {
            parser(file, function(err, data) {
                if (err) {
                    cb(err);
                } else {
                    state = merge(state, data);
                    cb();
                }
            });
        } else {
            cb();
        }

    }, function concat(cb) {
        joinedFile.path = path.join(joinedFile.base, fileName);
        joinedFile.contents = new Buffer(JSON.stringify(state, null, '    '));
        joinedFile.mergedData = state;
        this.push(joinedFile);
        cb();
    });
}

module.exports = configStreamMerger;
