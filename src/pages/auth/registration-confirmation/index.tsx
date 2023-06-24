import Head from 'next/head'
import React, { useEffect } from 'react'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { ConfirmEmailBox } from '@/components/ConfirmEmailBox/ConfirmEmailBox'
import congratulations from '../../../../public/assets/images/congratulations.png'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useRegistrationConfirmationMutation } from '@/services/AuthService'
import { InctagramPath } from '@/shared/api/path'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

const RegistrationConfirmation = () => {
    const { t } = useTranslation('congratulations')
    const router = useRouter()
    const [code] = Array.isArray(router.query.code) ? router.query.code : [router.query.code];


    const [registrationConfirmation, { isSuccess, error, isError, isLoading }] =
        useRegistrationConfirmationMutation()

    useEffect(() => {
        if (code) {
            registrationConfirmation({ confirmationCode: code }).then((res) => {
                console.log('code', code)
                console.log('response', res)
            })
        }
    }, [code])

    useEffect(() => {
        if (isError) {
            void router.push(InctagramPath.AUTH.INVALID_LINK)
        }
    }, [isError])

    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <>
            <Head>
                <title>Inctagram - Congratulations</title>
                <meta name='title' content='Confirm' />
            </Head>
            <ConfirmEmailBox
                title={t('Congratulations')}
                text={t('Text')}
                src={congratulations}
                buttonText={t('SignIn')}
            />
        </>
    )
}

RegistrationConfirmation.getLayout = getHeaderLayout
export default RegistrationConfirmation
