import { PropsWithChildren, ReactElement } from 'react'

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
import { useTranslation } from 'react-i18next'

export const SidebarLayout = ({ children }: PropsWithChildren) => {
    const { t } = useTranslation('sidebar')

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
                    <ul>
                        <li>
                            <div>
                                <HomeIcon />
                            </div>
                            <LinkA href={'/'} text={t('Home')} />
                        </li>
                        <li>
                            <div>
                                <AddIcon />
                            </div>
                            <LinkA href={'/'} text={t('Add')} />
                        </li>
                        <li>
                            <div>
                                <ProfileIcon />
                            </div>
                            <LinkA href={'/'} text={t('Profile')} />
                        </li>
                        <li>
                            <div>
                                <BookmarkIcon />
                            </div>
                            <LinkA href={'/'} text={t('Favorites')} />
                        </li>
                        <li>
                            <div>
                                <LogoutIcon />
                            </div>
                            <LinkA href={'/'} text={t('LogOut')} />
                        </li>
                    </ul>
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
