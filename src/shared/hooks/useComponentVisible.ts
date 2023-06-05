import React, { useState, useEffect, useRef } from 'react'

export const useComponentVisible = (initialIsVisible: boolean) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const ref = useRef<HTMLElement>(null)

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsComponentVisible(false)
        }
    }

    const handleClickOutside = (event: Event | React.SyntheticEvent) => {
        if (ref.current !== null && !ref.current.contains(event.target as HTMLElement)) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true)
        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true)
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return { ref, isComponentVisible, setIsComponentVisible }
}
