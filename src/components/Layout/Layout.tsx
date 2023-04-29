import { PropsWithChildren, ReactElement } from 'react';

import { Header } from '@/components/header';
import cls from './Layout.module.scss';
import Head from 'next/head';

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Head>
                <title>Incubator Inctagram</title>
                <meta name='description' content='Inctagram App' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />
            <main className={cls.layoutContainer}>{children}</main>
        </>
    );
};
export const getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};
