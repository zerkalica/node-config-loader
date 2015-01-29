function extmerge(destination) {
    var object, key, value, sourceKey;
    for (var i = 1, ln = arguments.length; i < ln; i++) {
        object = arguments[i];
        for (key in object) {
            value = object[key];
            if (value && value.constructor === Object) {
                sourceKey = destination[key];
                if (!sourceKey) sourceKey = destination[key] = {};
                extmerge(sourceKey, value);
            } else {
                if (Array.isArray(value)) value = [].concat(value);
                destination[key] = value;
            }
        }
    }

    return destination;
}

module.exports = extmerge;
