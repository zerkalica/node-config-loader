// @flow

function mergeToTarget<V: Object>(target: V, src: Object, _pushKeys?: string[]): V {
    const keys: string[] = Object.keys(src)
    for (let i = 0, j = keys.length; i < j; i++) {
        const key: string = keys[i]
        const val: mixed = src[key]
        if (val !== undefined) {
            if (typeof val === 'object' && val !== null) {
                if (Array.isArray(val)) {
                    const arr = _pushKeys && _pushKeys.indexOf(key) !== -1
                        ? (target[key] || [])
                        : []
                    target[key] = arr.concat(val)
                } else {
                    if (!target[key]) {
                        target[key] = {}
                    }
                    let pushKeys: string[]
                    if (target[key].__push__) {
                        pushKeys = target[key].__push__
                        delete target[key].__push__
                    }
                    mergeToTarget(target[key], val, pushKeys)
                }
            } else {
                target[key] = val
            }
        }
    }

    return target
}

export default function merge(...objects: Object[]): Object {
    const dest = {}
    for (let i = 0, j = objects.length; i < j; i++) {
        mergeToTarget(dest, objects[i])
    }

    return dest
}
