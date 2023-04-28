import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Layout} from '@/components/layout'
import {SnackbarProvider} from "notistack"

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className='container'>
            <SnackbarProvider maxSnack={1}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SnackbarProvider>
        </div>
    )
}

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }