import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import {Inter} from 'next/font/google';
import {ReactElement, Suspense} from 'react';
import {NextPage} from 'next';
import {useLoader} from '@/shared/hooks/useLoader';
import '../styles/nprogress.css'; // кастомные стили progress bar
// import 'nprogress/nprogress.css'; // стандартные стили progress bar
import {ni18nConfig} from '@/common/config/i18n.config';
import {appWithI18Next} from 'ni18n';
import {wrapper} from '@/store/store';
import {Provider} from 'react-redux';

export const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    style: 'normal',
    subsets: ['latin', 'cyrillic']
});

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
    useLoader();

    const getLayout = Component.getLayout ?? ((page) => page);
    const { store } = wrapper.useWrappedStore(pageProps);

    return getLayout(
        <>
            <style jsx global>
                {`
                    html {
                        font-family: ${inter.style.fontFamily};
                    }
                `}
            </style>
            <Provider store={store}>
                <Suspense fallback={<div>...</div>}>
                    <Component {...pageProps} />
                </Suspense>
            </Provider>
        </>
    );
}

// export default App;
export default appWithI18Next(App, ni18nConfig);
