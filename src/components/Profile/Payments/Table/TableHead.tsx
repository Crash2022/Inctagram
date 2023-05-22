import React from 'react'
import cls from '../Payments.module.scss'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'

export const TableHead = () => {
    const { t } = useTranslation('settings-payments')

    return (
        <div className={cls.table_head}>
            <div className={clsx(cls.row, cls.row_col_4)}>
                <div className={cls.col}>{t('table.date')}</div>
                <div className={cls.col}>{t('table.price')}</div>
                <div className={cls.col}>{t('table.subscriptionType')}</div>
                <div className={cls.col}>{t('table.paymentsType')}</div>
            </div>
        </div>
    )
}
