import React from 'react'
import Head from 'next/head'
import cls from './ProfileStatistics.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'

const ProfileStatistics: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Statistics' />
            </Head>
            <div className={cls.profilePageStatistics}>Profile Statistics</div>
        </>
    )
}

ProfileStatistics.getLayout = getSidebarLayout
export default ProfileStatistics
