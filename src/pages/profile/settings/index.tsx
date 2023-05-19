import React from 'react'
import Head from 'next/head'
import cls from './ProfileSettings.module.scss'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { useFetchUserProfileQuery } from '@/services/UserProfileService'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import ProfilePhoto from '../../../../public/assets/images/profile-photo.jpg'
import { Button } from '@/shared/ui/Button/Button'
import { useMeQuery } from '@/services/AuthService'
import { useRouter } from 'next/router'

const ProfileSettings: NextPageWithLayout = () => {
    // const { t } = useTranslation('profile-settings')
    // const router = useRouter()

    // const { data: photos, error, isLoading, isError } = useFetchUserProfileQuery(9)
    // const { data: meData } = useMeQuery()

    // if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Settings' />
            </Head>
            <div className={cls.profilePageSettings}>ProfileSettings PUSH</div>
        </>
    )
}

ProfileSettings.getLayout = getSidebarLayout
export default ProfileSettings
