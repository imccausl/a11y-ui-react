import { Children, cloneElement, isValidElement } from 'react'

import { useActionMenuContext } from './context'

export const Trigger: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isOpen, setIsOpen } = useActionMenuContext()

    if (
        !children ||
        !isValidElement(children) ||
        Children.count(children) > 1
    ) {
        throw new Error(
            `The Trigger component must have exactly one child element`,
        )
    }

    const handleOnClick = () => {
        setIsOpen(!isOpen)
    }

    return cloneElement(children as React.ReactElement, {
        onClick: handleOnClick,
        type: 'button',
    })
}
