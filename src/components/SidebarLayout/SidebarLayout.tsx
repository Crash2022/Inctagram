import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import cls from './SidebarLayout.module.scss'
import Head from 'next/head'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import LinkA from '@/shared/ui/LinkA/LinkA'
import HomeIcon from './../../../public/assets/icons/home-icon.svg'
import AddIcon from './../../../public/assets/icons/add-icon.svg'
import ProfileIcon from './../../../public/assets/icons/profile-icon.svg'
import BookmarkIcon from './../../../public/assets/icons/bookmark-outline.svg'
import Statistics from './../../../public/assets/icons/statistics.svg'
import LogoutIcon from './../../../public/assets/icons/logout-icon.svg'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { InctagramPath } from '@/shared/api/path'
import { useLogoutMutation } from '@/services/AuthService'
import { useRouter } from 'next/router'
import { AddPostModal } from '@/components/AddPost/AddPostModal/AddPostModal'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { ImageCropModal } from '@/components/AddPost/ImageCropModal/ImageCropModal'

// interface MenuLinkType {
//     id: number
//     icon: any
//     href: string
//     title: any
// }

export const SidebarLayout = ({ children }: PropsWithChildren) => {
    const { t } = useTranslation('sidebar')
    const router = useRouter()
    const [logout, { isSuccess, error, isError, isLoading }] = useLogoutMutation()
    const isPaid = true // исправить на динамическое значение
    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)

    // const [menuLink, setMenuLink] = useState<MenuLinkType[]>([
    //     { id: 1, icon: <HomeIcon />, href: InctagramPath.PROFILE.HOME, title: t('Home') },
    //     { id: 2, icon: <AddIcon />, href: InctagramPath.PROFILE.ADD_POST, title: t('Add') },
    //     { id: 3, icon: <ProfileIcon />, href: InctagramPath.PROFILE.PROFILE, title: t('Profile') },
    //     {
    //         id: 4,
    //         icon: <BookmarkIcon />,
    //         href: InctagramPath.PROFILE.FAVORITES,
    //         title: t('Favorites')
    //     }
    // ])

    useEffect(() => {
        if (isSuccess) void router.push(InctagramPath.AUTH.LOGIN)
    }, [isSuccess])

    // useLoader(isLoading)
    if (isLoading) return <LoaderScreen variant={'circle'} />

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
                            {/*{menuLink.map((el) => {*/}
                            {/*    return (*/}
                            {/*        <div*/}
                            {/*            key={el.id}*/}
                            {/*            className={*/}
                            {/*                router.pathname === el.href*/}
                            {/*                    ? cls.menuList_item_active*/}
                            {/*                    : cls.menuList_item*/}
                            {/*            }*/}
                            {/*        >*/}
                            {/*            <div className={cls.item_image}>{el.icon}</div>*/}
                            {/*            <LinkA*/}
                            {/*                href={el.href}*/}
                            {/*                text={el.title}*/}
                            {/*                className={cls.link}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    )*/}
                            {/*})}*/}

                            <div
                                className={
                                    router.pathname === InctagramPath.PROFILE.HOME
                                        ? cls.menuList_item_active
                                        : cls.menuList_item
                                }
                            >
                                <div>
                                    <HomeIcon />
                                </div>
                                <LinkA
                                    href={InctagramPath.PROFILE.HOME}
                                    text={t('Home')}
                                    className={cls.link}
                                />
                            </div>

                            <AddPostModal
                                isAddPostOpen={isAddPostOpen}
                                setIsAddPostOpen={setIsAddPostOpen}
                                header={t('AddPhotoModal')}
                            />

                            <div className={cls.menuList_item}>
                                <div>
                                    <AddIcon />
                                </div>
                                <div
                                    className={cls.link}
                                    onClick={() => {
                                        setIsAddPostOpen(true)
                                    }}
                                >
                                    {t('Add')}
                                </div>
                            </div>
                            <div
                                className={
                                    router.pathname === InctagramPath.PROFILE.PROFILE
                                        ? cls.menuList_item_active
                                        : cls.menuList_item
                                }
                            >
                                <div>
                                    <ProfileIcon />
                                </div>
                                <LinkA
                                    href={InctagramPath.PROFILE.PROFILE}
                                    text={t('Profile')}
                                    className={cls.link}
                                />
                            </div>
                            <div
                                className={
                                    router.pathname === InctagramPath.PROFILE.FAVORITES
                                        ? cls.menuList_item_active
                                        : cls.menuList_item
                                }
                            >
                                <div>
                                    <BookmarkIcon />
                                </div>
                                <LinkA
                                    href={InctagramPath.PROFILE.FAVORITES}
                                    text={t('Favorites')}
                                    className={cls.link}
                                />
                            </div>

                            {isPaid ? (
                                <div
                                    className={
                                        router.pathname === InctagramPath.PROFILE.STATISTICS
                                            ? cls.menuList_item_active
                                            : cls.menuList_item
                                    }
                                >
                                    <div className={cls.item_image}>
                                        <Statistics />
                                    </div>
                                    <LinkA
                                        href={InctagramPath.PROFILE.STATISTICS}
                                        text={t('Statistics')}
                                        className={cls.link}
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className={cls.menuList_bottom}>
                            <div
                                className={cls.menuList_item}
                                onClick={async () => {
                                    const res = await logout()
                                    console.log('logout', res)
                                    localStorage.removeItem('accessToken')
                                    await router.push(InctagramPath.AUTH.LOGIN)
                                }}
                            >
                                <div className={cls.item_image}>
                                    <LogoutIcon />
                                </div>
                                <div className={cls.link}>{t('LogOut')}</div>
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
