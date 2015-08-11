import path from 'path'

export default function makeJsonParser() {
    return function jsonParser(file) {
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(file.contents.toString()))
        })
        .catch(e => {
            e.message = file.path + ': ' + e.message
            throw e
        })
    }
}
