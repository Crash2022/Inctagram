import Head from 'next/head'
import React from 'react'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { ConfirmEmailBox } from '@/components/ConfirmEmailBox/ConfirmEmailBox'
import waitEmailLink from '../../../../public/assets/images/waitEmailLink.png'
import { useTranslation } from 'react-i18next'

const InvalidLink = () => {
    const { t } = useTranslation('invalid-link')

    return (
        <>
            <Head>
                <title>Inctagram - Invalid link</title>
                <meta name='title' content='Confirm' />
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

InvalidLink.getLayout = getHeaderLayout
export default InvalidLink
