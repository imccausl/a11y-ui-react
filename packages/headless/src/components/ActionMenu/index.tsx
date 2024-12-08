import React, { useState } from 'react'

import { ButtonItem, LinkItem, Menu } from './Menu'
import { Trigger } from './Trigger'
import { ActionMenuContext } from './context'

interface ActionMenu {
    Link: typeof LinkItem
    Button: typeof ButtonItem
    Menu: typeof Menu
    Trigger: typeof Trigger
}

const ActionMenu: ActionMenu = ({ children }: React.PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <ActionMenuContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ActionMenuContext.Provider>
    )
}

ActionMenu.Link = LinkItem
ActionMenu.Button = ButtonItem
ActionMenu.Menu = Menu
ActionMenu.Trigger = Trigger

export { ActionMenu }
