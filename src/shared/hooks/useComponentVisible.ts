import React, { useState, useEffect, useRef } from 'react'

export const useComponentVisible = (initialIsVisible: boolean): {
    ref: React.RefObject<HTMLDivElement>,
    isComponentVisible: boolean,
    setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>
} => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
};
