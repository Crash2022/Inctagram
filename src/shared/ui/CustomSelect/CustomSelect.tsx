import React from 'react'
import Select from 'react-select'

import cls from './CustomSelect.module.scss'
import clsx from 'clsx'

export interface Option {
    label: string
    value: string
}

interface Props {
    options: Option[]
    value: Option
    onChange: (option: Option) => void
}

export const CustomSelect = ({ options, onChange, value }: Props) => {
    const handleChange = (option: Option | null) => {
        option && onChange(option)
    }

    return (
        <Select
            onChange={handleChange}
            options={options}
            value={value}
            className={cls.select}
            classNames={{
                control: (state) => clsx(cls.select_control, state.isFocused && cls.select_focus),
                singleValue: () => cls.currentValue,
                indicatorSeparator: () => cls.separator,
                placeholder: () => cls.placeholder,
                menu: () => cls.menu,
                menuList: () => cls.menu_list,
                option: (state) =>
                    clsx(
                        cls.option,
                        state.isFocused && cls.option_active,
                        state.isSelected && cls.option_selected
                    ),
                indicatorsContainer: () => cls.arrow_container
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: {
                    ...theme.colors,
                    primary: '#333',
                    neutral0: '#333',
                    primary25: '#747d86'
                }
            })}
        />
    )
}
