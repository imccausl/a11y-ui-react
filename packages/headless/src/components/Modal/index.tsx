import React, { useId, useRef } from 'react'

import { Overlay } from '../Overlay'
import { Portal } from '../Portal'
import { SlotProvider, useSlotProps } from '../Slots'

import { ClickOutsideHandler } from './ClickOutsideHandler'

type PropsWithClassName<P> = {
    className?: string
} & P

type ModalProps = {
    id?: string
    onClose?: () => void
    isOpen?: boolean
}

const useModalProps = (
    props?: ModalProps,
): Omit<ModalProps, 'id'> & {
    'aria-labelledby': string
    'aria-modal': true
    role: 'dialog'
} => {
    const generatedId = useId()
    const { id = `modal-${generatedId}`, ...restProps } = props ?? {}

    return {
        ...restProps,
        'aria-labelledby': id,
        'aria-modal': true,
        role: 'dialog',
    }
}

type ModalContext = ModalProps | null

const ModalContext = React.createContext<ModalContext>(null)

export const useModal = () => {
    const context = React.useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }

    return context
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
    children,
    onClose,
    isOpen,
    id,
}) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const modalProps = useModalProps({ id })

    const slots = {
        close: {
            onClick: onClose,
        },
        panel: {
            ref: modalRef,
            role: modalProps.role,
            'aria-modal': modalProps['aria-modal'],
            'aria-labelledby': modalProps['aria-labelledby'],
        },
    }

    const handleClickOutside = (
        event: MouseEvent | PointerEvent | FocusEvent | TouchEvent,
    ) => {
        event.stopPropagation()
        onClose?.()
    }

    if (!isOpen) return null

    return (
        <ModalContext.Provider value={{ onClose, isOpen }}>
            <SlotProvider value={slots}>
                <ClickOutsideHandler
                    containers={modalRef}
                    onClickOutside={handleClickOutside}
                >
                    <Overlay>
                        <Portal>{children}</Portal>
                    </Overlay>
                </ClickOutsideHandler>
            </SlotProvider>
        </ModalContext.Provider>
    )
}

export const ModalPanel: React.FC<
    PropsWithClassName<React.PropsWithChildren>
> = ({ children, className }) => {
    const panelProps = useSlotProps({ className }, 'panel')
    const { onClose } = useModal()

    const slots = {
        heading: {
            id: panelProps['aria-labelledby'],
        },
        close: {
            onClick: onClose,
            autofocus: true,
        },
    }

    return (
        <SlotProvider value={slots}>
            <div {...panelProps}>{children}</div>
        </SlotProvider>
    )
}
