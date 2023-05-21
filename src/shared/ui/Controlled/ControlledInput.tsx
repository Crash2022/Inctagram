import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Input } from '@/shared/ui/Input/Input'

interface ControlledCustomInputProps {
    name: string
    placeholder: string
    password?: boolean
    control: UseFormReturn<any>
    rules?: Omit<
        RegisterOptions<any, any>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
    error?: any
    disabled?: boolean
    divClassName?: any
    value?: string
    onChangeValueCallBack?: (text: string) => void
}

export const ControlledInput = ({
    name,
    placeholder,
    password,
    control,
    rules,
    error,
    disabled,
    divClassName,
    onChangeValueCallBack,
    value
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
                        password={password || false}
                        placeholder={placeholder}
                        value={value || field.value}
                        onChange={(value) => {
                            onChangeValueCallBack
                                ? onChangeValueCallBack(value.currentTarget.value)
                                : field.onChange(value)
                        }}
                        error={error}
                        disabled={disabled || false}
                        // error={!!control.formState.errors[name]}
                        // helperText={control.formState.errors[name]?.message}
                    />
                )}
            />
        </div>
    )
}
