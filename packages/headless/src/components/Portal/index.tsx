import { type FC, type PropsWithChildren, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = PropsWithChildren<{
    target?: HTMLElement
}>

const noopSubscribe = () => {
    return () => {}
}

export const Portal: FC<PortalProps> = ({
    children,
    target = typeof window !== 'undefined' ? document?.body : null,
}) => {
    // ensures we are client side rendering before using createPortal
    // which is not supported on the server
    const hydrated = useSyncExternalStore(
        noopSubscribe,
        () => true, // snapshot always returns true because at this point we're on the client
        () => false, // server snapshot alwasy returns false because at this point we're on the server
    )

    return hydrated && target ? createPortal(children, target) : null
}
