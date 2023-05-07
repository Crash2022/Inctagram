import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Input } from '@/shared/ui/Input/Input'

interface ControlledCustomInputProps {
    name: string
    placeholder: string
    type?: string
    control: UseFormReturn<any>
    rules?: Omit<
        RegisterOptions<any, any>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
    divClassName?: any
    disabled?: boolean
}

export const ControlledInput = (props: ControlledCustomInputProps) => {
    return (
        <div className={props.divClassName}>
            <Controller
                name={props.name}
                control={props.control.control}
                rules={props.rules}
                render={({ field }: any) => (
                    <Input
                        {...field}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value)
                        }}
                        placeholder={props.placeholder}
                        type={props.type}
                        // error={!!props.control.formState.errors[props.name]}
                        // helperText={props.control.formState.errors[props.name]?.message}
                        disabled={props.disabled ? props.disabled : false}
                    />
                )}
            />
        </div>
    )
}
