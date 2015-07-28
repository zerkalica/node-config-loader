const slice = Array.prototype.slice

export default function nodePromisify(fn, self = null) {
    return function promised() {
        const args = slice.call(arguments)
        return new Promise((resolve, reject) => {
            function cb(err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }
            fn.apply(self, args.concat([cb]))
        })
    }
}
