import React, {
    Children,
    cloneElement,
    createContext,
    isValidElement,
    useContext,
    useRef,
    useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Revealer } from 'app/components/Revealer'

type DisclosureContextType = null | {
    isShowing: boolean
    setIsShowing: (isShowing: boolean) => void
    buttonRef: React.RefObject<HTMLButtonElement>
    closeDisclosure: () => void
}
interface Disclosure extends React.FC<React.PropsWithChildren> {
    Content: typeof DisclosureContent
    Trigger: typeof DisclosureTrigger
}

const DisclosureContext = createContext<DisclosureContextType>(null)

export const useDisclosure = () => {
    const context = useContext(DisclosureContext)

    if (!context) {
        throw new Error(
            `Disclosure components cannot be rendered outside the Disclosure context`,
        )
    }

    return context
}

const DisclosureContent: React.FC<
    React.PropsWithChildren & { attachTo?: React.RefObject<HTMLElement> }
> = ({ children, attachTo }) => {
    const { isShowing } = useDisclosure()

    if (attachTo?.current) {
        return createPortal(
            <Revealer isRevealed={isShowing}>{children}</Revealer>,
            attachTo.current,
        )
    }

    return <Revealer isRevealed={isShowing}>{children}</Revealer>
}

const DisclosureTrigger: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isShowing, setIsShowing, buttonRef } = useDisclosure()

    if (
        !children ||
        !isValidElement(children) ||
        Children.count(children) > 1
    ) {
        throw new Error(
            `The Trigger component must have exactly one child element`,
        )
    }

    const triggerA11yValues = {
        'aria-expanded': isShowing,
        'aria-controls': '', // TODO: should be the id of the disclosure container
    }

    const handleOnClick = () => {
        setIsShowing(!isShowing)
    }

    return cloneElement(children as React.ReactElement, {
        onClick: handleOnClick,
        ref: buttonRef,
        ...triggerA11yValues,
    })
}

const Disclosure: Disclosure = ({ children }) => {
    const [isShowing, setIsShowing] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const closeDisclosure = () => setIsShowing(false)

    return (
        <DisclosureContext.Provider
            value={{
                isShowing,
                setIsShowing,
                buttonRef,
                closeDisclosure,
            }}
        >
            {children}
        </DisclosureContext.Provider>
    )
}

Disclosure.Content = DisclosureContent
Disclosure.Trigger = DisclosureTrigger

export { Disclosure }
