export default function makeJsParser() {
    return function jsParser(file) {
        return new Promise(resolve => {
            resolve(require(file.path))
        })
        .catch(e => {
            e.message = file.path + ': ' + e.message
            throw e
        })
    }
}
