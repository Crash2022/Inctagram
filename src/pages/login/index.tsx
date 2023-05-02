import React, { useEffect } from 'react';
import Head from 'next/head';
import s from './Login.module.scss';
import { useSnackbar } from 'notistack';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layout/Layout';
import { useTranslation } from 'react-i18next';

const Login: NextPageWithLayout = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation('login');

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
                    <div>{t('LoginPage')}</div>
                </div>
            </div>
        </>
    );
};

Login.getLayout = getLayout;
export default Login;
