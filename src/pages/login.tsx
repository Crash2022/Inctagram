import React from 'react'
import Head from 'next/head'
import s from '../styles/Login.module.scss'

const Login = () => {
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