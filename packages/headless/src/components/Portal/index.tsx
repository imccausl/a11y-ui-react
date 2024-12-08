import { type FC, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { useIsHydrated } from '../../hooks/useIsHydrated/index.js'

type PortalProps = PropsWithChildren<{
    target?: HTMLElement
}>

export const Portal: FC<PortalProps> = ({
    children,
    target = typeof window !== 'undefined' ? document?.body : null,
}) => {
    const hydrated = useIsHydrated()
    
    return hydrated && target ? createPortal(children, target) : null
}
