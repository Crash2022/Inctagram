import Head from 'next/head'
import s from '@/styles/Home.module.scss'
import LinkA from "@/shared/ui/LinkA/LinkA"

export default function Home() {
    return (
        <>
            <Head>
                <title>Incubator Inctagram</title>
                <meta name="description" content="Inctagram App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                {/*<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>*/}
            </Head>
            <main className={s.main}>
                <div>
                    <h1>Incubator Inctagram</h1>
                </div>
                <LinkA href={'/login'} text={'Login'}/>
            </main>
        </>
    )
}
