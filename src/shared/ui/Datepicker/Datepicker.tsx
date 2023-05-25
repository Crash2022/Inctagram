import React from 'react'
import { Controller } from 'react-hook-form'

export default function Datepicker({ isClearable = false, onClear = () => {}, ...rest }) {
    return (
        <div className='datepicker'>
            <Controller {...rest} />
            {isClearable && (
                <button type='button' onClick={onClear}>
                    x
                </button>
            )}
        </div>
    )
}
