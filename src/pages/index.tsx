import Head from 'next/head'
import s from '@/styles/Home.module.scss'
import LinkA from "@/shared/ui/LinkA/LinkA"
import {Inter} from 'next/font/google'

// шрифт
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Incubator Inctagram</title>
                <meta name="description" content="Inctagram App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {/*<main className={`${s.main} ${inter.className}`}>*/}
            <main className={s.main}>
                <div>
                    <h1>Incubator Inctagram</h1>
                </div>
                <LinkA href={'/login'} text={'Login'}/>
            </main>
        </>
    )
}
