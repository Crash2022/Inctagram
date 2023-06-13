import React from 'react'
import { Controller } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Input } from '@/shared/ui/Input/Input'

interface ControlledCustomInputProps {
    id?: string
    name: string
    placeholder: string
    password?: boolean
    control: any
    rules?: Omit<
        RegisterOptions<any, any>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
    error?: any
    disabled?: boolean
    divClassName?: any
    type?: string
    max?: string
}

export const ControlledInput = ({
    id,
    name,
    placeholder,
    password,
    control,
    rules,
    error,
    disabled,
    divClassName,
    type,
    max
}: ControlledCustomInputProps) => {
    return (
        <div className={divClassName}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }: any) => (
                    <Input
                        {...field}
                        id={id}
                        password={password ?? false}
                        placeholder={placeholder}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value)
                        }}
                        error={error}
                        disabled={disabled ?? false}
                        type={type}
                        max={max}
                    />
                )}
            />
        </div>
    )
}
