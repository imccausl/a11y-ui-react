import React, { createContext, useContext, useState } from 'react'

import { Revealer, useRevealerValues } from 'app/components/Revealer'

interface ToolTip extends React.FC<React.PropsWithChildren> {}

type ToolTipContext = {
    isOpen: boolean
    toggleToolTip: () => void
}

const ToolTipContext = createContext<ToolTipContext | null>(null)

export const useToolTip = () => {
    const context = useContext(ToolTipContext)

    if (!context) {
        throw new Error(
            `ToolTip components cannot be rendered outside the ToolTip context`,
        )
    }

    return context
}

const ToolTipProvider: React.FC<
    React.PropsWithChildren & { setIsOpen: (value: boolean) => void }
> = ({ children, setIsOpen }) => {
    const { isRevealed } = useRevealerValues()
    const toggleToolTip = () => {
        setIsOpen(!isRevealed)
    }

    return (
        <ToolTipContext.Provider value={{ isOpen: isRevealed, toggleToolTip }}>
            {children}
        </ToolTipContext.Provider>
    )
}

export const ToolTip: ToolTip = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Revealer isRevealed={isOpen}>
            <ToolTipProvider setIsOpen={setIsOpen}>{children}</ToolTipProvider>
        </Revealer>
    )
}
