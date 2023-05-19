import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Input } from '@/shared/ui/Input/Input'

interface ControlledCustomInputProps {
    id?: string
    name: string
    placeholder: string
    type?: string
    password?: boolean
    control: UseFormReturn<any>
    rules?: Omit<
        RegisterOptions<any, any>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
    error?: any
    disabled?: boolean
    divClassName?: any
}

export const ControlledInput = ({
    id,
    name,
    placeholder,
    type,
    password,
    control,
    rules,
    error,
    disabled,
    divClassName
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
                        type={type}
                        password={password}
                        placeholder={placeholder}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value)
                        }}
                        error={error}
                        disabled={disabled ? disabled : false}
                        // error={!!control.formState.errors[name]}
                        // helperText={control.formState.errors[name]?.message}
                    />
                )}
            />
        </div>
    )
}
