import Head from 'next/head'
import React from 'react'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { ConfirmEmailBox } from '@/components/ConfirmEmailBox/ConfirmEmailBox'
import waitEmailLink from '../../../../public/assets/images/waitEmailLink.png'
import { useTranslation } from 'next-i18next'

const ExpiredLink = () => {
    const { t } = useTranslation('expired-link')

    return (
        <>
            <Head>
                <title>Inctagram - Expired link</title>
                <meta name='title' content='Expired Link' />
            </Head>
            <ConfirmEmailBox
                title={t('Title')}
                text={t('Text')}
                src={waitEmailLink}
                buttonText={t('Resend')}
            />
        </>
    )
}

ExpiredLink.getLayout = getHeaderLayout
export default ExpiredLink
