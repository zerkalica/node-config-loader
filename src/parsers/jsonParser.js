export default function makeJsonParser() {
    return function jsonParser(file) {
        return new Promise(resolve => {
            resolve(JSON.parse(file.contents.toString()))
        })
        .catch(e => {
            e.message = file.path + ': ' + e.message
            throw e
        })
    }
}
