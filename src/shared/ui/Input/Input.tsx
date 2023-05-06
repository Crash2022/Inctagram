import React, { forwardRef, InputHTMLAttributes, KeyboardEvent, useState } from 'react'

import cls from './Input.module.scss'
import EyeIcon from '../../../../public/assets/icons/eye-Icon.svg'
import EyeIconSlashed from '../../../../public/assets/icons/eye-icon-slashed.svg'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    onEnter?: () => void
    password?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { error, onEnter, placeholder, password, id, ...restProps } = props
    const [typeInput, setTypeInput] = useState<'password' | 'text'>(password ? 'password' : 'text')
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnter?.()
        }
    }
    const toggleTypeHandler = () => {
        setTypeInput((prev) => (prev === 'text' ? 'password' : 'text'))
    }
    return (
        <div className={cls.inputGroup}>
            <input
                ref={ref}
                type={typeInput}
                onKeyUp={onEnterHandler}
                id={id}
                placeholder={placeholder}
                className={clsx(cls.input, { [cls.error]: error })}
                {...restProps}
            />
            {password && (
                <span onClick={toggleTypeHandler} className={cls.icon}>
                    {typeInput === 'password' ? <EyeIcon /> : <EyeIconSlashed />}
                </span>
            )}
            {error && <span className={cls.errorMessage}>{error}</span>}
            {placeholder && (
                <label htmlFor={id} className={cls.inputLabel}>
                    {placeholder}
                </label>
            )}
        </div>
    )
})
