import { type default as React, useEffect } from 'react'

import { useLatestValue } from '../useLatestValue'

export type DocumentEvents = keyof DocumentEventMap
export type DocumentEvent<E extends DocumentEvents> = DocumentEventMap[E]

export type DocumentEventHandler<E extends DocumentEvents> = (
    event: DocumentEvent<E>,
) => void

export const useDocumentEvent = <
    E extends DocumentEvents,
    H extends DocumentEventHandler<E>,
>({
    enabled = true,
    event,
    handler,
}: {
    enabled?: boolean
    event: E
    handler: H
}) => {
    const latestHandler = useLatestValue(handler)

    useEffect(() => {
        if (!enabled) return

        document.addEventListener(event, latestHandler.current)
        return () => {
            document.removeEventListener(event, latestHandler.current)
        }
    }, [event, enabled])
}
