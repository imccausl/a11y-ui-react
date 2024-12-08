import clsx from 'clsx'

const chainCallbacks = (...callbacks: any[]) => {
    return (...args: any[]) => {
        for (const callback of callbacks) {
            callback(...args)
        }
    }
}

export const mergeProps = <T extends Record<string, unknown>[]>(...args: T) => {
    if (args.length === 0) return {}
    if (args.length === 1) return args[0]

    const result = { ...args[0] }

    for (const props of args) {
        for (const key in props) {
            const a = result[key]
            const b = props[key]

            if (typeof a === 'function' && typeof b === 'function') {
                if (
                    key.startsWith('on') &&
                    key.charCodeAt(2) >= 65 &&
                    key.charCodeAt(2) <= 90
                ) {
                    // Chain event handlers
                    result[key] = chainCallbacks(a, b)
                }
            } else if (
                (key === 'className' || key === 'UNSAFE_className') &&
                typeof a === 'string' &&
                typeof b === 'string'
            ) {
                // Merge class names
                result[key] = clsx(a, b)
            } else {
                result[key] = b !== 'undefined' ? b : a
            }
        }
    }

    return result
}
