import React from 'react'
import Head from 'next/head'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { LoginForm } from '@/components/Forms/LoginForm/LoginForm'
import { NextPageWithLayout } from '@/pages/_app'

const Login: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Inctagram Login</title>
                <meta name='title' content='Login' />
            </Head>

            <FormWrapper marginTop={36}>
                <LoginForm />
            </FormWrapper>
        </>
    )
}

Login.getLayout = getHeaderLayout
export default Login
