import React, {
    type InputHTMLAttributes,
    type ReactNode,
    createContext,
    forwardRef,
    useContext,
    useId,
} from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactNode
    label?: string
    invalid?: boolean
    hint?: string | null
}

type InputContext = InputProps & {
    invalidHintId: string
    ref?: React.ForwardedRef<HTMLInputElement>
}

const InputContext = createContext<InputContext | null>(null)

const useInputContext = () => {
    const context = useContext(InputContext)
    if (!context) {
        throw new Error('Input components must be wrapped in a InputProvider')
    }
    return context
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ children, id, hint, ...props }, ref) => {
        const generatedId = useId()
        const invalidHintId = useId()
        const inputId = id ?? generatedId

        return (
            <InputContext.Provider
                value={{
                    ref,
                    invalidHintId: invalidHintId,
                    id: inputId,
                    hint,
                    ...props,
                }}
            >
                <div>
                    {props.label && <Label text={props.label} />}
                    {children ?? (
                        <>
                            <InputBox />
                            <ValidationHint />
                        </>
                    )}
                </div>
            </InputContext.Provider>
        )
    },
)

Input.displayName = 'Input'

type LabelProps = {
    children?: ReactNode
    text: string
    visuallyHidden?: boolean
}

export function Label({ children, text, visuallyHidden }: LabelProps) {
    const input = useInputContext()
    const id = input.id

    return (
        <div className="mb-1 flex items-center justify-between">
            <label
                htmlFor={id}
                className={`block text-sm font-medium leading-6 text-gray-900 ${
                    visuallyHidden ? 'sr-only' : ''
                }`}
            >
                {text}
            </label>
            <div className="text-sm">{children}</div>
        </div>
    )
}

type InputBoxProps = {
    children?: ReactNode
}

export function InputBox({ children }: InputBoxProps) {
    const { ref, id, invalid, invalidHintId, ...props } = useInputContext()

    const inputStyles = invalid ? 'ring-pink-600' : 'ring-gray-300'
    return (
        <div
            className={`${
                children ? 'pl-2' : ''
            } ${inputStyles} flex flex-row items-center justify-start rounded-md border-0 bg-white px-2 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600`}
        >
            {children}
            <input
                aria-invalid={invalid}
                ref={ref}
                id={id}
                aria-describedby={invalidHintId}
                {...props}
                className={`${
                    children ? 'ml-2' : ''
                } block w-full border-none text-sm font-semibold leading-6 focus:outline-none`}
            />
        </div>
    )
}

export function ValidationHint({ children }: { children?: React.ReactNode }) {
    const { invalidHintId, invalid, hint } = useInputContext()

    return (
        <div
            id={invalidHintId}
            role="status"
            className="mt-1 h-5 text-right text-xs font-semibold text-pink-600"
        >
            {invalid ? (children ?? hint ?? '') : null}
        </div>
    )
}
