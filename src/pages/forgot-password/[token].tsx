import Head from 'next/head';
import {useSnackbar} from 'notistack';
import {getLayout} from "@/components/Layout/Layout";
import {FormWrapper} from "@/components/Forms/FormWrapper/FormWrapper";
import {CreateNewPasswordForm} from "@/components/Forms/CreateNewPasswordForm/CreateNewPassword";
import {useEffect} from "react";

const CreatePassword = () => {
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        enqueueSnackbar('Проверка снекбара', {variant: 'info', autoHideDuration: 2000});
    }, []);

    return (
        <>
            <Head>
                <title>New Password</title>
                <meta name='title' content='Login'/>
            </Head>

            <FormWrapper top={132}>
                <CreateNewPasswordForm/>
            </FormWrapper>
        </>
    );
};

CreatePassword.getLayout = getLayout;

export default CreatePassword;
