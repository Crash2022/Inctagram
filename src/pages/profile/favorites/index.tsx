import React from 'react'
import Head from 'next/head'
import cls from './ProfileFavorites.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'

const ProfileFavorites: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Favorites' />
            </Head>
            <div className={cls.profilePageFavorites}>Profile Favorites</div>
        </>
    )
}

ProfileFavorites.getLayout = getSidebarLayout
export default ProfileFavorites
