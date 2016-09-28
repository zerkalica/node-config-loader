// @flow

type CbFn<V> = (err?: Error, data: V) => void

export default function nodePromisify<R>(
    fn: (...args: any[]) => void,
    self?: ?Object = null
): (...args: any[]) => Promise<R> {
    return function promised(...args: any[]) {
        return new Promise((resolve, reject) => {
            function cb(err?: Error, data: R): void {
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
