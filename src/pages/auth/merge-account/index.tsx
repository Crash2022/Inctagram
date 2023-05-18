import Head from 'next/head'
import React from 'react'
import mergeAccount from '../../../../public/assets/images/mergeAccount.png'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { ConfirmEmailBox } from '@/components/ConfirmEmailBox/ConfirmEmailBox'
import { useTranslation } from 'react-i18next'

const MergeAccount = () => {
    const { t } = useTranslation('mergeAccount')

    return (
        <>
            <Head>
                <title>Inctagram - Merger of Accounts</title>
                <meta name='title' content='Confirm' />
            </Head>
            <ConfirmEmailBox
                title={t('mergeAccount')}
                text={t('text')}
                src={mergeAccount}
                buttonText={''}
                merge={true}
            />
        </>
    )
}

MergeAccount.getLayout = getHeaderLayout
export default MergeAccount
