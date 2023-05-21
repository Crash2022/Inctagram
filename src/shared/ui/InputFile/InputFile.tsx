import React, { ButtonHTMLAttributes, ChangeEvent, PropsWithChildren, useRef } from 'react'
import cls from '../Button/Button.module.scss'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    className?: string
    theme?: 'primary' | 'primaryWhite' | 'outline' | 'clear'
    onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputFile = (props: PropsWithChildren<ButtonProps>) => {
    const { theme = 'primary', className, title , onChange} = props

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef?.current?.click()
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
        }
    }

    return (
        <label>
            <button
                className={clsx(cls.button, [className, cls[theme]])}
                onClick={selectFileHandler}
            >
                {title}
            </button>
            <input
                ref={inputRef}
                type='file'
                onChange={onChange ?? uploadHandler}
                style={{ display: 'none' }}
            />

            {/*вариант 2*/}
            {/*<input*/}
            {/*    type='file'*/}
            {/*    onChange={uploadHandler}*/}
            {/*    className={cls.input_file}*/}
            {/*/>*/}
        </label>
    )
}
