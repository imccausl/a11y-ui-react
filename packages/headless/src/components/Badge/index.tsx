export const Variant = {
    DEFAULT: 'default',
    PRIMARY: 'primary',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    INFO: 'info',
    PURPLE: 'purple',
    PINK: 'pink',
} as const

const variantsToClassNames = {
    [Variant.DEFAULT]: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    [Variant.PRIMARY]: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
    [Variant.SUCCESS]: 'bg-green-50 text-green-700 ring-green-600/10',
    [Variant.WARNING]: 'bg-yellow-50 text-yellow-800 ring-yellow-600/10',
    [Variant.DANGER]: 'bg-red-50 text-red-700 ring-red-600/10',
    [Variant.INFO]: 'bg-blue-50 text-blue-700 ring-blue-700/10',
    [Variant.PURPLE]: 'bg-purple-50 text-purple-700 ring-purple-700/10',
    [Variant.PINK]: 'bg-pink-50 text-pink-700 ring-pink-700/10',
} as const

const baseStyles =
    'inline-flex items-center rounded-md h-5 px-2 py-2 uppercase text-[12px] font-medium ring-1 ring-inset'

type BadgeProps = {
    variant?: (typeof Variant)[keyof typeof Variant]
}
export const Badge: React.FC<React.PropsWithChildren & BadgeProps> = ({
    children,
    variant = Variant.DEFAULT,
}) => {
    return (
        <span
            className={`${baseStyles} ${
                variantsToClassNames[variant ?? Variant.DEFAULT]
            }`}
        >
            {children}
        </span>
    )
}
