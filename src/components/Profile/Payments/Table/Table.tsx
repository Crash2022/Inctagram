import React from 'react'
import cls from '../Payments.module.scss'

import { TableHead } from '@/components/Profile/Payments/Table/TableHead'
import { TableBody } from '@/components/Profile/Payments/Table/TableBody'
import { MockData } from '@/components/Profile/Payments/Payments'

interface Props {
    data: MockData[]
}

const Table = ({ data }: Props) => {
    return (
        <div className={cls.table}>
            <TableHead />
            <TableBody data={data} />
        </div>
    )
}

export default Table
