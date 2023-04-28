import React, {useEffect} from 'react'
import Head from 'next/head'
import s from '../styles/Login.module.scss'
import {useSnackbar} from 'notistack'

const Login = () => {

    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        enqueueSnackbar('Проверка снекбара', {variant: 'info', autoHideDuration: 2000})
    }, [])

    return (
        <>
            <Head>
                <title>Inctagram Login</title>
                <meta name='title' content='Login'/>
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