import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React, { createContext, useContext, useState } from 'react'

import { Overlay } from '../Overlay'
import { Portal } from '../Portal'

type ModalContext = {}

const ModalContext = createContext<ModalContext | null>(null)

export const ModalPanel: React.FC<React.PropsWithChildren> = ({ children }) => {
    const iconSlot = (
        <div className="size-10 sm:size-10 mx-auto flex shrink-0 items-center justify-center rounded-full bg-red-100 p-2 sm:mx-0">
            <ExclamationTriangleIcon
                aria-hidden="true"
                width="30"
                height="30"
                className="size-10 sm:size-10 text-red-600"
            />
        </div>
    )

    const headerSlot = 'Deactivate account'

    const bodySlot = (
        <p className="text-sm text-gray-500">
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
        </p>
    )

    return (
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-start">
                {iconSlot}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h1
                        className="text-base font-semibold text-gray-900"
                        id="modal-title"
                    >
                        {headerSlot}
                    </h1>
                    <div className="mt-2">{bodySlot}</div>
                </div>
            </div>
        </div>
    )
}

export const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(true)

    const footerSlot = (
        <>
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
                Deactivate
            </button>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
                Cancel
            </button>
        </>
    )

    return (
        <Modal>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <ModalPanel />
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {footerSlot}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
