import Head from 'next/head'
import React from 'react'
import { getLayout } from '@/components/Layout/Layout'
import { ConfirmEmailBox } from '@/components/ConfirmEmailBox/ConfirmEmailBox'
import congratulations from '../../../public/assets/images/congratulations.png'
import { useTranslation } from 'react-i18next'

const Congratulations = () => {
    const { t } = useTranslation('congratulations')

    return (
        <>
            <Head>
                <title>Inctagram - Congratulations</title>
                <meta name='title' content='Confirm' />
            </Head>
            <ConfirmEmailBox
                title={t('congratulations')}
                text={t('text')}
                src={congratulations}
                buttonText={t('SignIn')}
            />
        </>
    )
}

Congratulations.getLayout = getLayout
export default Congratulations
