import React, { useEffect } from 'react'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { getLayout } from '@/components/Layout/Layout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { LoginForm } from '@/components/Forms/LoginForm/LoginForm'
import { NextPageWithLayout } from '@/pages/_app'

const Login: NextPageWithLayout = () => {
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        enqueueSnackbar('Проверка снекбара', { variant: 'info', autoHideDuration: 2000 })
    }, [])

    return (
        <>
            <Head>
                <title>Inctagram Login</title>
                <meta name='title' content='Login' />
            </Head>

            <FormWrapper top={36}>
                <LoginForm />
            </FormWrapper>
        </>
    )
}

Login.getLayout = getLayout

export default Login
