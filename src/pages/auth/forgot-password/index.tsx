import Head from 'next/head'
import { getLayout } from '@/components/Layout/Layout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { ForgotPassword } from '@/components/Forms/ForgotPassword/ForgotPassword'
import { NextPageWithLayout } from '@/pages/_app'

const Forgot: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Forgot Password</title>
                <meta name='title' content='Forgot Password' />
            </Head>

            <FormWrapper marginTop={36}>
                <ForgotPassword />
            </FormWrapper>
        </>
    )
}

Forgot.getLayout = getLayout
export default Forgot
