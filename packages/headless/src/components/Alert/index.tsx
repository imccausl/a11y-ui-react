import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/16/solid'
import { type FC, type ReactNode } from 'react'

type AlertVariant = (typeof Variant)[keyof typeof Variant]
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type AlertRole = 'status' | 'alert'

type AlertProps = {
    variant?: AlertVariant
    children?: ReactNode
    heading: string
    role?: AlertRole
    headingLevel?: HeadingLevel
}

const Variant = {
    WARNING: 'warning',
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info',
} as const

const VariantStyles = {
    [Variant.WARNING]: 'bg-yellow-50 text-yellow-700 border-yellow-700',
    [Variant.ERROR]: 'bg-red-50 text-red-700 border-red-700',
    [Variant.SUCCESS]: 'bg-green-50 text-green-700 border-green-700',
    [Variant.INFO]: 'bg-blue-50 text-blue-700 border-blue-700',
} as const

const VariantIcons = {
    [Variant.WARNING]: ExclamationTriangleIcon,
    [Variant.ERROR]: ExclamationCircleIcon,
    [Variant.SUCCESS]: CheckCircleIcon,
    [Variant.INFO]: InformationCircleIcon,
} as const

export const Alert: FC<AlertProps> = ({
    variant = 'warning',
    children,
    heading,
    role = 'status',
    headingLevel = 'h2',
}) => {
    const AlertIcon = VariantIcons[variant]
    const HeadingLevel = headingLevel

    return (
        <div
            role={role}
            className={`rounded-l-md rounded-r-lg border-l-8 p-4 ${VariantStyles[variant]} grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] gap-x-3 text-sm text-opacity-90`}
        >
            <div className="row-span-1 h-6 w-6 self-center">
                <AlertIcon
                    height="20px"
                    width="20px"
                    className="m-0"
                    aria-label={`${variant} message`}
                />
            </div>
            <HeadingLevel className="font-semibold">{heading}</HeadingLevel>
            {children && (
                <div className="col-start-2 mt-2 font-normal">{children}</div>
            )}
        </div>
    )
}
