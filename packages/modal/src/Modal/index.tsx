import React, {
    createContext,
    useCallback,
    useContext,
    useId,
    useState,
} from 'react'
import { createPortal } from 'react-dom'

type ModalContext = {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

const ModalContext = createContext<ModalContext | null>(null)

type PrivateModalContext = {
    headingId: string
}

const PrivateModalContext = createContext<PrivateModalContext | null>(null)
export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider')
    }
    return context
}

const usePrivateModalContext = () => {
    const context = useContext(PrivateModalContext)
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider')
    }
    return context
}

type ModalHeaderProps = React.PropsWithChildren<{
    title: string
    className?: string
}>

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    title,
    className,
}) => {
    const { headingId } = usePrivateModalContext()

    return (
        <h1 className={className} id={headingId}>
            {title}
        </h1>
    )
}

type ModalProps = React.PropsWithChildren<{
    onClose?: () => void
    onOpen?: () => void
    attachTo?: HTMLElement
}>

type ModalContainerProps = React.PropsWithChildren<{
    attachTo?: HTMLElement
}>

const ModalContainer: React.FC<ModalContainerProps> = ({
    children,
    attachTo,
}) => {
    const { headingId } = usePrivateModalContext()
    const { closeModal, isOpen } = useModalContext()

    const handleKeyDown: React.KeyboardEventHandler<HTMLDialogElement> =
        useCallback((event) => {
            if (event.key === 'Escape') {
                event.stopPropagation()
                closeModal()
            }
        }, [])

    return createPortal(
        <dialog
            open={isOpen}
            aria-labelledby={headingId}
            onKeyDown={handleKeyDown}
        >
            {children}
        </dialog>,
        attachTo ?? document.body,
    )
}

interface Modal extends React.FC<ModalProps> {
    Header: typeof ModalHeader
}

const Modal: Modal = ({ onClose, onOpen, attachTo, children }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(true)
    const headingId = useId()

    const handleModalClose = useCallback(() => {
        setIsOpen(false)
        onClose?.()
    }, [])

    const handleModalOpen = useCallback(() => {
        setIsOpen(true)
        onOpen?.()
    }, [])

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                openModal: handleModalOpen,
                closeModal: handleModalClose,
            }}
        >
            <PrivateModalContext.Provider value={{ headingId }}>
                <ModalContainer attachTo={attachTo}>{children}</ModalContainer>
            </PrivateModalContext.Provider>
        </ModalContext.Provider>
    )
}

Modal.Header = ModalHeader

export { Modal }
