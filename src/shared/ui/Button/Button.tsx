import { type ButtonHTMLAttributes, memo, type PropsWithChildren } from 'react'

import cls from './Button.module.scss'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    divClassName?: string
    className?: string
    theme?: 'primary' | 'primaryWhite' | 'outline' | 'clear'
}

export const Button = memo((props: PropsWithChildren<ButtonProps>) => {
    const { theme = 'primary', className, divClassName, children, ...restProps } = props

    return (
        <div className={divClassName}>
            <button className={clsx(cls.button, [className, cls[theme]])} {...restProps}>
                {children}
            </button>
        </div>
    )
})
