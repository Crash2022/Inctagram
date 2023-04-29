import React, { useEffect } from 'react';
import Head from 'next/head';
import s from './Login.module.scss';
import { useSnackbar } from 'notistack';

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        enqueueSnackbar('Проверка снекбара', { variant: 'info', autoHideDuration: 2000 });
    }, []);

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Index' />
            </Head>
            <div className={s.loginPage}>
                <div className={s.container}>
                    <div>Login Page</div>
                </div>
            </div>
        </>
    );
};

export default Login;
