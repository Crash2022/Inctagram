import React, { useState } from 'react'

import Table from './Table/Table'
import { Controls } from './Controls/Controls'
import { Option } from '@/shared/ui/CustomSelect/CustomSelect'

export interface MockData {
    id: number
    date: string
    price: string
    subscriptionType: string
    paymentType: string
}

const mockData = [
    { id: 0, date: '12.12.2022', price: '10$', subscriptionType: '2 month', paymentType: 'PayPal' },
    {
        id: 1,
        date: '12.12.2022',
        price: '10$',
        subscriptionType: '12 month',
        paymentType: 'Stripe'
    },
    {
        id: 2,
        date: '12.12.2022',
        price: '70$',
        subscriptionType: '20 month',
        paymentType: 'PayPal'
    },
    {
        id: 3,
        date: '12.12.2022',
        price: '30$',
        subscriptionType: '12 month',
        paymentType: 'PayPal'
    },
    { id: 4, date: '12.12.2022', price: '70$', subscriptionType: '8 month', paymentType: 'Stripe' },
    {
        id: 5,
        date: '12.12.2022',
        price: '30$',
        subscriptionType: '20 month',
        paymentType: 'PayPal'
    },
    {
        id: 6,
        date: '12.12.2022',
        price: '30$',
        subscriptionType: '30 month',
        paymentType: 'Stripe'
    },
    {
        id: 7,
        date: '12.12.2022',
        price: '70$',
        subscriptionType: '20 month',
        paymentType: 'PayPal'
    },
    {
        id: 8,
        date: '12.12.2022',
        price: '30$',
        subscriptionType: '12 month',
        paymentType: 'PayPal'
    },
    { id: 9, date: '12.12.2022', price: '10$', subscriptionType: '5 month', paymentType: 'Stripe' }
]

const selectOptions: Option[] = [
    { label: '1', value: '1' },
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' }
]

export const Payments = () => {
    const [itemsCount, setItemsCount] = useState(Number(selectOptions[1].value))
    const [currentPage, setCurrentPage] = useState(1)

    const totalCount = mockData.length
    const pageCount = Math.ceil(totalCount / itemsCount)
    const dataChunk = getDataChunk(currentPage, itemsCount)

    const handleChangePage = (nextPage: number) => {
        setCurrentPage(nextPage)
    }

    const handleChangeItemsCount = (newItemsCount: number) => {
        setItemsCount(newItemsCount)
        setCurrentPage(1)
    }

    return (
        <div>
            <Table data={dataChunk} />

            <Controls
                countItemsValue={itemsCount}
                currentPage={currentPage}
                pageCount={pageCount}
                onChangePage={handleChangePage}
                selectOptions={selectOptions}
                onChangeItemsCount={handleChangeItemsCount}
            />
        </div>
    )
}

function getDataChunk(currentPageNumber: number, itemsCount: number) {
    const startIndex: number = (currentPageNumber - 1) * itemsCount
    const endIndex = startIndex + itemsCount

    return mockData.slice(startIndex, endIndex)
}
