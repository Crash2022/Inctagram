import React, { InputHTMLAttributes, ChangeEvent, PropsWithChildren } from 'react'
import cls from '../Button/Button.module.scss'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string
    className?: string
    theme?: 'primary' | 'primaryWhite' | 'outline' | 'clear'
    onChangeUpload: (event: ChangeEvent<HTMLInputElement>) => void
}

export const InputFile = (props: PropsWithChildren<InputProps>) => {
    const { theme = 'primary', className, title, id, onChangeUpload, ...restProps } = props

    // const inputRef = useRef<HTMLInputElement>(null)
    //
    // const selectFileHandler = () => {
    //     inputRef && inputRef.current?.click()
    //     // inputRef.current.value = ''
    // }

    return (
        <label>
            {/* <button */}
            {/*    className={clsx(cls.button, [className, cls[theme]])} */}
            {/*    onClick={selectFileHandler} */}
            {/* > */}
            {/*    {title} */}
            {/* </button> */}
            <span
                className={clsx(cls.button, [className, cls[theme]])}
                style={{ display: 'block', height: '100%', minWidth: '200px' }}
            >
                {title}
            </span>
            <input
                id={id}
                // ref={inputRef}
                type='file'
                onChange={onChangeUpload}
                style={{ display: 'none' }}
                {...restProps}
            />

            {/* вариант 2 */}
            {/* <input */}
            {/*    type='file' */}
            {/*    onChange={uploadHandler} */}
            {/*    className={cls.input_file} */}
            {/* /> */}
        </label>
    )
}
