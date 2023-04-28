import { PropsWithChildren, ReactElement } from 'react';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import s from '../styles/Layout.module.scss';
import { inter } from '@/pages/_app';
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
            <div className={s.layoutContainer}>{children}</div>
            <Footer />
        </>
    );
};
export const getLayout = (page: ReactElement) => {
    return (
        <main className={inter.className}>
            <Layout>{page}</Layout>
        </main>
    );
};
