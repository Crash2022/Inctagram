import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode, Suspense } from 'react';
import { NextPage } from 'next';
import { useLoader } from '@/shared/hooks/useLoader';
import '../styles/nprogress.css';
// import 'nprogress/nprogress.css';
import { ni18nConfig } from '@/common/config/i18n.config';
import { appWithI18Next } from 'ni18n';

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

function App({ Component, pageProps }: AppPropsWithLayout) /*: ReactNode*/ {
    useLoader();

    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <>
            <style jsx global>
                {`
                    html {
                        font-family: ${inter.style.fontFamily};
                    }
                `}
            </style>
            <Suspense fallback={<div>...</div>}>
                <Component {...pageProps} />
            </Suspense>
        </>
    );
}

// export default App;
export default appWithI18Next(App, ni18nConfig);
