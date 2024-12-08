import React, { forwardRef } from 'react'

import { useSlotProps } from '../Slots'

import { Spinner } from './Spinner'

type ButtonVariant = (typeof Variant)[keyof typeof Variant]

type OwnProps = {
    variant?: ButtonVariant
    leadingIcon?: React.ReactNode
    disabled?: boolean
    rounded?: boolean
    fullWidth?: boolean
    isLoading?: boolean
}

type ButtonProps = React.PropsWithChildren &
    React.ButtonHTMLAttributes<HTMLButtonElement> &
    OwnProps

export const Variant = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
    PLAIN: 'plain',
    DEFAULT: 'default',
    BORDERED_PLAIN: 'bordered-plain',
    DARK_PLAIN: 'dark-plain',
} as const

const variantStyleMap = {
    [Variant.PRIMARY]: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    [Variant.SECONDARY]: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    [Variant.DANGER]: 'bg-red-600 hover:bg-red-700 text-white',
    [Variant.PLAIN]: 'bg-transparent hover:bg-gray-100 text-gray-900',
    [Variant.DEFAULT]: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    [Variant.BORDERED_PLAIN]: 'bg-transparent hover:bg-gray-200 text-gray-900',
    [Variant.DARK_PLAIN]: 'bg-black hover:bg-white hover:text-black text-white',
} as const

const borderStyleMap = {
    [Variant.PRIMARY]: 'ring-1 ring-inset ring-gray-300',
    [Variant.SECONDARY]: 'ring-1 ring-inset ring-gray-300',
    [Variant.DANGER]: 'ring-1 ring-inset ring-red-600',
    [Variant.PLAIN]: 'ring-0 ring-transparent ring-inset',
    [Variant.DEFAULT]: 'ring-1 ring-inset ring-gray-300',
    [Variant.BORDERED_PLAIN]: 'ring-1 ring-inset ring-gray-300',
    [Variant.DARK_PLAIN]: 'ring-1 ring-inset ring-black hover:ring-gray-300',
} as const

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            disabled = false,
            variant = Variant.DEFAULT,
            leadingIcon,
            rounded = false,
            onClick,
            fullWidth = false,
            className,
            isLoading = false,
            ...restProps
        },
        ref,
    ) => {
        const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled || isLoading) {
                e.preventDefault()
                e.stopPropagation()
                return
            }

            onClick?.(e)
        }

        return (
            <button
                className={`${variantStyleMap[variant]} ${
                    borderStyleMap[variant]
                } flex flex-row items-center justify-center p-5 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ${
                    rounded
                        ? 'm-0 h-fit w-fit rounded-full p-2'
                        : 'rounded-md px-2 py-1'
                } ${fullWidth ? 'w-full' : ''}`}
                ref={ref}
                onClick={handleOnClick}
                aria-disabled={disabled || isLoading}
                {...restProps}
            >
                {leadingIcon ? (
                    <div aria-hidden="true" className={`${!rounded && 'mr-2'}`}>
                        {leadingIcon}
                    </div>
                ) : null}
                {children}
            </button>
        )
    },
)

ButtonBase.displayName = 'ButtonBase'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ isLoading, slot, ...restProps }, ref) => {
        const buttonProps = useSlotProps(restProps, slot ?? 'button')
        if (isLoading) {
            return (
                <ButtonBase
                    ref={ref}
                    {...buttonProps}
                    isLoading={true}
                    leadingIcon={
                        <Spinner
                            height="20px"
                            width="20px"
                            aria-label="Signing in"
                        />
                    }
                />
            )
        }

        return <ButtonBase ref={ref} {...buttonProps} />
    },
)

Button.displayName = 'Button'

type IconButtonProps = {
    label: string
}

const IconButton = forwardRef<HTMLButtonElement, ButtonProps & IconButtonProps>(
    ({ children, label, ...restProps }, ref) => {
        return (
            <Button
                rounded={true}
                ref={ref}
                aria-label={label}
                variant={Variant.PLAIN}
                {...restProps}
            >
                {children}
            </Button>
        )
    },
)

IconButton.displayName = 'IconButton'

export { Button, IconButton }
