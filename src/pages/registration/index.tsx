import React from 'react'
import Head from 'next/head'
import { getLayout } from '@/components/Layout/Layout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { RegistrationForm } from '@/components/Forms/RegistrationForm/RegistrationForm'
import { NextPageWithLayout } from '@/pages/_app'

const Registration: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Inctagram Registration</title>
                <meta name='title' content='Registration' />
            </Head>

            <FormWrapper marginTop={36}>
                <RegistrationForm />
            </FormWrapper>
        </>
    )
}

Registration.getLayout = getLayout

export default Registration
