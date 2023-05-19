import React from 'react'
import cls from './ContentBox.module.scss'

interface ContentBoxProps {
    children: any
    width?: string
    divClassName?: any
}

export const ContentBox = ({ children, width = '100%', divClassName }: ContentBoxProps) => {
    return (
        <div className={divClassName}>
            <div style={{ width: `${width}` }} className={cls.contentBox}>
                {children}
            </div>
        </div>
    )
}
