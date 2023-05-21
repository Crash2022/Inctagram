import React from 'react'
import Head from 'next/head'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { NextPageWithLayout } from '@/pages/_app'
import { CreateNewPasswordForm } from '@/components/Forms/CreateNewPasswordForm/CreateNewPasswordForm'

const CreateNewPassword: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Create New Password</title>
                <meta name='title' content='Recovery Password' />
            </Head>

            <FormWrapper marginTop={96}>
                <CreateNewPasswordForm />
            </FormWrapper>
        </>
    )
}

CreateNewPassword.getLayout = getHeaderLayout
export default CreateNewPassword
