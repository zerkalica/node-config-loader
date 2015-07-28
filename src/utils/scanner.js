export default function makeScanner({filter, merge, readFile}) {
    return function scanner(files) {
        return Promise.resolve(files)
            .then(realFiles => Promise.all(realFiles.filter(filter).map(readFile)))
            .then(objects => objects.reduce((acc, object) => merge(acc, object), {}))
    }
}
