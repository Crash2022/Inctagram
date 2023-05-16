import { memo, type PropsWithChildren } from 'react'

import cls from '../Button/Button.module.scss'
import clsx from 'clsx'
import Link from 'next/link'

interface ButtonLinkProps {
    className?: string
    theme?: 'primary' | 'primaryWhite' | 'outline' | 'clear'
    title: string
    href: string
}

export const ButtonLink = memo((props: PropsWithChildren<ButtonLinkProps>) => {
    const { theme = 'primary', className, title, href } = props

    return (
        <Link className={clsx(cls.button, [className, cls[theme]])} href={href}>
            {title}
        </Link>
    )
})
