import Head from 'next/head'
import React, { useEffect } from 'react'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { ConfirmEmailBox } from '@/components/ConfirmEmailBox/ConfirmEmailBox'
import waitEmailLink from '../../../../public/assets/images/waitEmailLink.png'
import { useTranslation } from 'next-i18next'
import { useRegistrationResendLinkMutation } from '@/services/AuthService'

const InvalidLink = () => {
    const { t } = useTranslation('invalid-link')

    const [
        registrationResendLink,
        {
            error: resendError,
            isError: resendIsError,
            isLoading: resendIsLoading,
            isSuccess: resendIsSuccess
        }
    ] = useRegistrationResendLinkMutation()

    let email
    useEffect(() => {
        email = localStorage.getItem('email')
    }, [])

    return (
        <>
            <Head>
                <title>Inctagram - Invalid link</title>
                <meta name='title' content='Invalid Link' />
            </Head>
            <ConfirmEmailBox
                title={t('Title')}
                text={t('Text')}
                src={waitEmailLink}
                buttonText={t('Resend')}
                resend={registrationResendLink}
                email={email}
                isLoading={resendIsLoading}
                isSuccess={resendIsSuccess}
            />
        </>
    )
}

InvalidLink.getLayout = getHeaderLayout
export default InvalidLink
