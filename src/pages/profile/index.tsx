import React from 'react'
import Head from 'next/head'
import cls from './Profile.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
import { useTranslation } from 'react-i18next'
import { useFetchUserProfileQuery } from '@/services/UserProfileService'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import ProfilePhoto from '../../../public/assets/images/profile-photo.jpg'

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
                <div className={cls.profilePage}>
                    <div className={cls.profilePage_header}>
                        <div className={cls.header_photo}>
                            <Image
                                src={ProfilePhoto}
                                alt={'profile-photo'}
                                width={204}
                                height={204}
                            />
                        </div>
                        <div className={cls.header_info}></div>
                    </div>
                    <div className={cls.profilePage_content}>
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
