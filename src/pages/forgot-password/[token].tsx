import Head from 'next/head'
import { getLayout } from '@/components/Layout/Layout'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { CreateNewPasswordForm } from '@/components/Forms/CreateNewPasswordForm/CreateNewPassword'

const CreatePassword = () => {
    return (
        <>
            <Head>
                <title>New Password</title>
                <meta name='title' content='Login' />
            </Head>

            <FormWrapper top={132}>
                <CreateNewPasswordForm />
            </FormWrapper>
        </>
    )
}

CreatePassword.getLayout = getLayout
export default CreatePassword
