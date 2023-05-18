import { PropsWithChildren, ReactElement, useEffect } from 'react'

import cls from './SidebarLayout.module.scss'
import Head from 'next/head'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import LinkA from '@/shared/ui/LinkA/LinkA'
import HomeIcon from './../../../public/assets/icons/home-icon.svg'
import AddIcon from './../../../public/assets/icons/add-icon.svg'
import ProfileIcon from './../../../public/assets/icons/profile-icon.svg'
import BookmarkIcon from './../../../public/assets/icons/bookmark-outline.svg'
import LogoutIcon from './../../../public/assets/icons/logout-icon.svg'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { InctagramPath } from '@/shared/api/path'
import { useLogoutMutation } from '@/services/AuthService'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { useRouter } from 'next/router'

export const SidebarLayout = ({ children }: PropsWithChildren) => {
    const { t } = useTranslation('sidebar')
    const router = useRouter()
    const [logout, { isSuccess, error, isError, isLoading }] = useLogoutMutation()

    useEffect(() => {
        if (isSuccess) router.push(InctagramPath.AUTH.LOGIN).then()
    }, [isSuccess])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <>
            <Head>
                <title>Inctagram</title>
                <meta name='description' content='Inctagram App' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Header />
            <main className={cls.layoutContainer}>
                <nav>
                    <div className={cls.menuList}>
                        <div className={cls.menuList_top}>
                            <div className={cls.menuList_item}>
                                <div>
                                    <HomeIcon />
                                </div>
                                <LinkA href={'/'} text={t('Home')} />
                            </div>
                            <div className={cls.menuList_item}>
                                <div>
                                    <AddIcon />
                                </div>
                                <LinkA href={'/'} text={t('Add')} />
                            </div>
                            <div className={cls.menuList_item}>
                                <div>
                                    <ProfileIcon />
                                </div>
                                <LinkA href={'/'} text={t('Profile')} />
                            </div>
                            <div className={cls.menuList_item}>
                                <div>
                                    <BookmarkIcon />
                                </div>
                                <LinkA href={'/'} text={t('Favorites')} />
                            </div>
                        </div>
                        <div className={cls.menuList_bottom}>
                            <div
                                className={cls.menuList_item}
                                onClick={async () => {
                                    await logout().then((res) => {
                                        console.log('logout', res)
                                        localStorage.removeItem('accessToken')
                                        router.push(InctagramPath.AUTH.LOGIN)
                                    })
                                }}
                            >
                                <div>
                                    <LogoutIcon />
                                </div>
                                <div>{t('LogOut')}</div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={cls.childrenClass}>{children}</div>
            </main>
            <Footer />
        </>
    )
}

export const getSidebarLayout = (page: ReactElement) => {
    return <SidebarLayout>{page}</SidebarLayout>
}
