import React, { useEffect } from 'react'

export const Overlay: React.FC<React.PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        const originalStyle = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = originalStyle
        }
    }, [])

    return (
        <div
            className="fixed inset-0 z-[1000] bg-gray-500/75 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
        >
            {children}
        </div>
    )
}
