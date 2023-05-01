import React, { forwardRef, InputHTMLAttributes, KeyboardEvent } from 'react';
import SearchIcon from '../../../../public/assets/icons/magnifying-glass.svg';
import cls from './SearchInput.module.scss';
import clsx from 'clsx';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    onEnter?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
    const { error, onEnter, ...restProps } = props;
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnter?.();
        }
    };
    return (
        <div className={cls.inputGroup}>
            <input
                ref={ref}
                onKeyUp={onEnterHandler}
                id={'title'}
                className={clsx(cls.input, { [cls.error]: error })}
                {...restProps}
            />
            <SearchIcon className={cls.icon} />
            {error && <span className={cls.errorMessage}>{error}</span>}
        </div>
    );
});
