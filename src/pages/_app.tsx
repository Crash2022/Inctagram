import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    style: 'normal',
    subsets: ['latin', 'cyrillic']
});

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout): ReactNode {
    const getLayout = Component.getLayout ?? ((page) => page);
    return getLayout(
        <>
            <style jsx global>{`
                html {
                    font-family: ${inter.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    );
}

// export default function App({Component, pageProps}: AppProps) {
//     return (
//         <div className='container'>
//             <SnackbarProvider maxSnack={1}>
//                 <Layout>
//                     <Component {...pageProps} />
//                 </Layout>
//             </SnackbarProvider>
//         </div>
//     )
// }

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
