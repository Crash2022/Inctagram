import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Textarea } from '@/shared/ui/Textarea/Textarea'

interface ControlledCustomTextareaProps {
    name: string
    placeholder: string
    control: UseFormReturn<any>
    rules?: Omit<
        RegisterOptions<any, any>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
    error?: any
    disabled?: boolean
    divClassName?: any
}

export const ControlledTextarea = ({
    name,
    placeholder,
    control,
    rules,
    error,
    disabled,
    divClassName
}: ControlledCustomTextareaProps) => {
    return (
        <div className={divClassName}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }: any) => (
                    <Textarea
                        {...field}
                        placeholder={placeholder}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value)
                        }}
                        error={error}
                        disabled={disabled ?? false}
                    />
                )}
            />
        </div>
    )
}
