import React from 'react'
import Head from 'next/head'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { RegistrationForm } from '@/components/Forms/RegistrationForm/RegistrationForm'
import { NextPageWithLayout } from '@/pages/_app'

const Registration: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Inctagram Registration</title>
                <meta name='title' content='Registration' />
            </Head>
            <RegistrationForm />
        </>
    )
}

Registration.getLayout = getHeaderLayout
export default Registration
