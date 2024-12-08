import React, { forwardRef } from 'react'

import { useSlotProps } from '../Slots'

export const Heading = forwardRef<
    HTMLHeadingElement,
    React.PropsWithChildren<
        React.HTMLProps<HTMLHeadingElement> & { level?: number; slot?: string }
    >
>(({ level = '2', slot, children, ...domProps }, ref) => {
    const slotProps = useSlotProps(domProps, slot ?? 'heading')
    const Component = `h${level}` as React.ElementType

    return (
        <Component ref={ref} {...slotProps}>
            {children}
        </Component>
    )
})

Heading.displayName = 'Heading'
