import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import s from '@/styles/Home.module.scss'
import LinkA from "@/shared/ui/LinkA/LinkA"

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>Incubator Inctagram</title>
                <meta name="description" content="Inctagram App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${s.main} ${inter.className}`}>
                <div>
                    <h1>Incubator Inctagram</h1>
                </div>
                <LinkA href={'https://www.google.com'} text={'Google'}/>
            </main>
        </>
    )
}
