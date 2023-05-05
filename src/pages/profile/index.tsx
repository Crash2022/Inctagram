import React from 'react'
import Head from 'next/head'
import s from './Profile.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
import { useTranslation } from 'react-i18next'
import { useFetchUserProfileQuery } from '@/services/UserProfileService'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

const Profile: NextPageWithLayout = () => {
    const { t } = useTranslation('profile')

    const { data: posts, error, isLoading, isError } = useFetchUserProfileQuery(10)

    if (isLoading) {
        return <LoaderScreen variant={'loader'} />
    } else {
        return (
            <>
                <Head>
                    <title>Inctagram Index</title>
                    <meta name='title' content='Index' />
                </Head>
                <div className={s.profilePage}>
                    <div>
                        <div>{t('ProfilePage')}</div>
                        <div>
                            {posts &&
                                posts.map((post) => {
                                    return (
                                        <div key={post.id}>
                                            {post.id} {post.title}
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

Profile.getLayout = getSidebarLayout
export default Profile
