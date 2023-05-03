import Head from 'next/head';
import {useSnackbar} from 'notistack';
import {getLayout} from "@/components/Layout/Layout";
import {FormWrapper} from "@/components/Forms/FormWrapper/FormWrapper";
import {ForgotPassword} from "@/components/Forms/ForgotPassword/ForgotPassword";
import {useEffect} from "react";
import {NextPageWithLayout} from "@/pages/_app";


const Forgot: NextPageWithLayout = () => {
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        enqueueSnackbar('Проверка снекбара', {variant: 'info', autoHideDuration: 2000});
    }, []);

    return (
        <>
            <Head>
                <title>Forgot Password</title>
                <meta name='title' content='Forgot Password'/>
            </Head>

            <FormWrapper top={72}>
                <ForgotPassword/>
            </FormWrapper>
        </>
    );
};

Forgot.getLayout = getLayout;

export default Forgot;
