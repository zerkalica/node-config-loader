import _glob from 'glob'

export default function glob(pattern, options) {
    return new Promise((resolve, reject) => {
        _glob(mask, {
            nodir : true
        }, (err, matches) => err ? reject(err) : resolve(matches))
    })
}
