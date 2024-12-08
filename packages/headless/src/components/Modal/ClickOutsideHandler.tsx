import { type FC, type PropsWithChildren, useCallback } from 'react'

import { useDocumentEvent } from 'app/hooks/useDocumentEvent'
import { useLatestValue } from 'app/hooks/useLatestValue'

type Container = { current: HTMLElement | null }
type ContainerCollection = Set<Container> | Container[]
type ContainerInput =
    | (Container | ContainerCollection)
    | (() => Container | ContainerCollection)

type OnOutsideClickProps = {
    enabled?: boolean
    containers: ContainerInput
    onClickOutside: (
        event: MouseEvent | PointerEvent | FocusEvent | TouchEvent,
        target: HTMLElement,
    ) => void
}

export const useOutsideClick = ({
    enabled,
    containers,
    onClickOutside,
}: OnOutsideClickProps) => {
    const cb = useLatestValue(onClickOutside)

    const handler = useCallback(
        (event: MouseEvent | PointerEvent | FocusEvent | TouchEvent) => {
            if (!enabled) return

            const target = event.target as HTMLElement

            const _containers = (function resolve(containers: ContainerInput) {
                if (typeof containers === 'function')
                    return resolve(containers())
                if (Array.isArray(containers)) return containers
                if (containers instanceof Set) return containers
                return [containers]
            })(containers)

            for (const container of _containers) {
                console.log({
                    container,
                    target,
                    contained: container?.current?.contains(target),
                })
                if (container?.current === null) continue
                if (container?.current?.contains(target)) return
            }

            cb.current(event, target)
        },
        [enabled, containers],
    )

    useDocumentEvent({
        enabled,
        event: 'mousedown',
        handler,
    })
}

export const ClickOutsideHandler: FC<
    PropsWithChildren<OnOutsideClickProps>
> = ({ onClickOutside, containers, enabled = true, children }) => {
    useOutsideClick({
        enabled,
        containers,
        onClickOutside,
    })

    return children
}
