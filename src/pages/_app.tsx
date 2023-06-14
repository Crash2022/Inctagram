import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'
import { NextPage } from 'next'
import { useProgressLoader } from '@/shared/hooks/useProgressLoader'
import '../styles/nprogress.css'
import { appWithI18Next } from 'ni18n'
import { wrapper } from '@/store/store'
import { Provider } from 'react-redux'
import { ni18nConfig } from '../../ni18n.config'
// import { appWithTranslation } from 'next-i18next'
import { SnackbarProvider } from 'notistack'
import AuthRedirect from '@/features/AuthRedirect/AuthRedirect'
// import { Cookies, CookiesProvider } from 'react-cookie'

export const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    style: 'normal',
    subsets: ['latin', 'cyrillic']
})

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    useProgressLoader()

    const getLayout = Component.getLayout ?? ((page) => page)
    const { store } = wrapper.useWrappedStore(pageProps)
    // const protectedRoutes = [InctagramPath.PROFILE.PROFILE]

    // const cookies = new Cookies()

    return (
        <>
            <style jsx global>
                {`
                    html {
                        font-family: ${inter.style.fontFamily};
                    }
                `}
            </style>
            <Provider store={store}>
                <AuthRedirect>
                    <SnackbarProvider maxSnack={2}>
                        {/* <CookiesProvider cookies={cookies}> */}
                        {/* <Suspense fallback={<div>...</div>}> */}
                        {getLayout(<Component {...pageProps} />)}
                        {/* </Suspense> */}
                        {/* </CookiesProvider> */}
                    </SnackbarProvider>
                </AuthRedirect>
            </Provider>
        </>
    )
}

// export default App
export default appWithI18Next(App, ni18nConfig)
// export default appWithTranslation(App)
