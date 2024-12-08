import { useEffect, useState } from 'react'

async function getUserMedia(settings: MediaStreamConstraints) {
    if (!window.navigator.mediaDevices.getUserMedia) {
        throw new Error('media devices are not supported')
    }

    return navigator.mediaDevices.getUserMedia(settings)
}

export function useUserMedia(settings: MediaStreamConstraints) {
    const [error, setError] = useState<unknown | null>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)

    useEffect(() => {
        async function enableVideoStream() {
            try {
                const stream = await getUserMedia(settings)
                setStream(stream)
            } catch (error) {
                setError(error)
            }
        }

        if (!stream) {
            enableVideoStream()
        } else {
            return function cleanup() {
                stream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [])

    return [stream, error] as const
}
