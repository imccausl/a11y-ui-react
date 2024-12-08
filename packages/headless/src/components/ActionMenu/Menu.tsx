import { useActionMenuContext } from './context'

type LinkItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonItemProps = React.AnchorHTMLAttributes<HTMLButtonElement> & {
    type?: 'button' | 'submit'
}

export const LinkItem: React.FC<LinkItemProps & React.PropsWithChildren> = ({
    href,
    id,
    children,
    ...restProps
}) => {
    return (
        <li
            role="presentation"
            className="block px-4 py-2 text-sm text-gray-700"
        >
            <a href={href} role="menuitem" tabIndex={-1} id={id} {...restProps}>
                {children}
            </a>
        </li>
    )
}

export const ButtonItem: React.FC<
    ButtonItemProps & React.PropsWithChildren
> = ({ id, children, type = 'button', ...restProps }) => {
    return (
        <li
            role="presentation"
            className="block px-4 py-2 text-sm text-gray-700"
        >
            <button
                role="menuitem"
                type={type}
                tabIndex={-1}
                id={id}
                {...restProps}
            >
                {children}
            </button>
        </li>
    )
}

export const Menu: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isOpen } = useActionMenuContext()

    if (!isOpen) return null

    return (
        <ul
            className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex={-1}
        >
            {children}
        </ul>
    )
}
