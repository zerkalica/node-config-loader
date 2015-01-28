var path = require('path');

/**
 * StrategyAdapter
 * @param {Adapter[file_extension]} adapters
 */
function StrategyAdapter(adapters) {
    return function strategyParser(file, cb) {
        var ext = path.extname(file.path).substring(1);
        if (!adapters[ext]) {
            cb(new Error(file.path + ': adapter not found for file ext ' + ext));
        } else {
            adapters[ext](file, cb);
        }
    };
}

module.exports = StrategyAdapter;
