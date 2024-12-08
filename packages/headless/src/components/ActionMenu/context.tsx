import { createContext, useContext } from 'react'

type ActionMenuContextType = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
} | null

export const ActionMenuContext = createContext<ActionMenuContextType>(null)

export const useActionMenuContext = () => {
    const context = useContext(ActionMenuContext)

    if (!context) {
        throw new Error(
            `ActionMenu components cannot be rendered outside the ActionMenu component`,
        )
    }

    return context
}
