import React from 'react'
import Head from 'next/head'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'

const ProfileHome: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Home' />
            </Head>
            <div>Home</div>
        </>
    )
}

ProfileHome.getLayout = getSidebarLayout
export default ProfileHome
