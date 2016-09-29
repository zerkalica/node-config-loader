// @flow

function mergeToTarget<V: Object>(target: V, src: Object, pushKeys: string[]): V {
    const keys: string[] = Object.keys(src)
    for (let i = 0, j = keys.length; i < j; i++) {
        const key: string = keys[i]
        const val: mixed = src[key]
        if (key === '__push__') {
            continue
        }
        if (val !== undefined) {
            if (typeof val === 'object' && val !== null) {
                if (Array.isArray(val)) {
                    const arr = pushKeys.indexOf(key) !== -1
                        ? (target[key] || [])
                        : []
                    target[key] = arr.concat(val)
                } else {
                    if (!target[key]) {
                        target[key] = {}
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

export default function merge(objects: Object[]): Object {
    const dest: Object = {}
    const pushKeys = objects[0].__push__ || []
    for (let i = 0, j = objects.length; i < j; i++) {
        const obj = objects[i]
        mergeToTarget(dest, obj, pushKeys)
    }

    return dest
}
