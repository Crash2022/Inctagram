import { PropsWithChildren, ReactElement } from 'react'

import cls from './HeaderLayout.module.scss'
import Head from 'next/head'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

export const HeaderLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Head>
                <title>Inctagram</title>
                <meta name='description' content='Inctagram App' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />
            <main className={cls.layoutContainer}>{children}</main>
            <Footer />
        </>
    )
}

export const getLayout = (page: ReactElement) => {
    return <HeaderLayout>{page}</HeaderLayout>
}
