import path from 'path'

export default function makeRequireReader() {
    return function requireReader(file) {
        return new Promise((resolve, reject) => {
            resolve(require(path.resolve(file)))
        })
    }
}
