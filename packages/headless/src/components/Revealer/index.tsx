import { createContext, useContext, useRef } from 'react'

type RevealerContextType = null | {
    isRevealed: boolean
    containerRef: React.RefObject<HTMLDivElement>
}

const RevealerContext = createContext<RevealerContextType>(null)

export const useRevealerValues = () => {
    const context = useContext(RevealerContext)

    if (!context) {
        throw new Error(
            `Revealer components cannot be rendered outside the Revealer context`,
        )
    }

    return context
}

const RevealerContent: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isRevealed } = useRevealerValues()

    return isRevealed ? <div>{children}</div> : null
}

export const Revealer: React.FC<
    React.PropsWithChildren & {
        isRevealed?: boolean
    }
> = ({ children, isRevealed = false }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <RevealerContext.Provider value={{ isRevealed, containerRef }}>
            <RevealerContent>{children}</RevealerContent>
        </RevealerContext.Provider>
    )
}
