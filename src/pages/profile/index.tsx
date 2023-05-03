import React from 'react'
import Head from 'next/head'
import s from './Profile.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/components/Layout/Layout'
import { useTranslation } from 'react-i18next'
import { useFetchUserProfileQuery } from '@/services/UserProfile'

const Profile: NextPageWithLayout = () => {
    const { t } = useTranslation('profile')

    const { data, error, isLoading, isError } = useFetchUserProfileQuery({
        limit: '10'
    })

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Index' />
            </Head>
            <div className={s.loginPage}>
                <div className={s.container}>
                    <div>{t('ProfilePage')}</div>
                </div>
            </div>
        </>
    )
}

Profile.getLayout = getLayout
export default Profile
