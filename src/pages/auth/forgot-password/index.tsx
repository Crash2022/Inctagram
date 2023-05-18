import Head from 'next/head'
import { getLayout } from '@/components/HeaderLayout/HeaderLayout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { NextPageWithLayout } from '@/pages/_app'
import { ForgotPasswordForm } from '@/components/Forms/ForgotPasswordForm/ForgotPassword'

const Forgot: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Forgot Password</title>
                <meta name='title' content='Forgot Password' />
            </Head>

            <FormWrapper marginTop={36}>
                <ForgotPasswordForm />
            </FormWrapper>
        </>
    )
}

Forgot.getLayout = getLayout
export default Forgot
