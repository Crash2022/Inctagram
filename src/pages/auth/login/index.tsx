import React from 'react'
import Head from 'next/head'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { LoginForm } from '@/components/Forms/LoginForm/LoginForm'
import { NextPageWithLayout } from '@/pages/_app'

const Login: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Inctagram Login</title>
                <meta name='title' content='Login' />
            </Head>
            <LoginForm />
        </>
    )
}

Login.getLayout = getHeaderLayout
export default Login
