import React from 'react'
import cls from '../Payments.module.scss'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { PaginationSelect } from './PaginationSelect/PaginationSelect'
import { Option } from '@/shared/ui/CustomSelect/CustomSelect'

interface Props {
    pageCount: number
    onChangePage: (nextPage: number) => void
    currentPage: number
    selectOptions: Option[]
    countItemsValue: number | string
    onChangeItemsCount: (itemsCount: number) => void
}
export const Controls = ({
    pageCount,
    currentPage,
    onChangePage,
    selectOptions,
    countItemsValue,
    onChangeItemsCount
}: Props) => {
    const selectValue: Option = { value: `${countItemsValue}`, label: `${countItemsValue}` }

    return (
        <div className={cls.controls}>
            <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                onChangePage={onChangePage}
            />

            <PaginationSelect
                value={selectValue}
                selectOptions={selectOptions}
                onChangeItemsCount={onChangeItemsCount}
            />
        </div>
    )
}
