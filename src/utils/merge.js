function mergeToTarget(target, src) {
    const keys = Object.keys(src)
    for (let i = 0, j = keys.length; i < j; i++) {
        const key = keys[i]
        const val = src[key]
        if (val !== undefined) {
            if (typeof val === 'object' && val !== null) {
                if (Array.isArray(val)) {
                    target[key] = [].concat(val)
                } else {
                    if (!target[key]) {
                        target[key] = {}
                    }
                    mergeToTarget(target[key], val)
                }
            } else {
                target[key] = val
            }
        }
    }

    return target
}

export default function merge() {
    const objects = Array.prototype.slice.call(arguments)
    const dest = {}
    for (let i = 0, j = objects.length; i < j; i++) {
        mergeToTarget(dest, objects[i])
    }

    return dest
}
