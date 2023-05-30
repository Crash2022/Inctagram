import Head from 'next/head'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { ForgotPasswordForm } from '@/components/Forms/ForgotPasswordForm/ForgotPassword'

const Forgot: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Forgot Password</title>
                <meta name='title' content='Forgot Password' />
            </Head>
            <ForgotPasswordForm />
        </>
    )
}

Forgot.getLayout = getHeaderLayout
export default Forgot
