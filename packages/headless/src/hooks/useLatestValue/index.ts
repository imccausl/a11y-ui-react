import { useEffect, useRef } from 'react'

export const useLatestValue = <T>(value: T) => {
    const cache = useRef(value)

    useEffect(() => {
        cache.current = value
    })

    return cache
}
