import Head from 'next/head'
import React from 'react'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { ConfirmEmailBox } from '@/components/ConfirmEmailBox/ConfirmEmailBox'
import waitEmailLink from '../../../../public/assets/images/waitEmailLink.png'
import { useTranslation } from 'react-i18next'

const ExpiredLink = () => {
    const { t } = useTranslation('expired-link')

    return (
        <>
            <Head>
                <title>Inctagram - Expired link</title>
                <meta name='title' content='Expired Link' />
            </Head>
            <ConfirmEmailBox
                title={t('title')}
                text={t('text')}
                src={waitEmailLink}
                buttonText={t('resend')}
            />
        </>
    )
}

ExpiredLink.getLayout = getHeaderLayout
export default ExpiredLink
