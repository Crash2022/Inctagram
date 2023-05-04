import React, { useEffect } from 'react'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { getLayout } from '@/components/Layout/Layout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { RegistrationForm } from '@/components/Forms/RegistrationForm/RegistrationForm'
import { NextPageWithLayout } from '@/pages/_app'

const Registration: NextPageWithLayout = () => {
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        enqueueSnackbar('Проверка снекбара', { variant: 'info', autoHideDuration: 2000 })
    }, [])

    return (
        <>
            <Head>
                <title>Inctagram Registration</title>
                <meta name='title' content='Registration' />
            </Head>

            <FormWrapper top={24}>
                <RegistrationForm />
            </FormWrapper>
        </>
    )
}

Registration.getLayout = getLayout

export default Registration
