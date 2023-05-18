import React from 'react'
import Head from 'next/head'
import cls from './Profile.module.scss'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { useFetchUserProfileQuery } from '@/services/UserProfileService'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import ProfilePhoto from '../../../public/assets/images/profile-photo.jpg'
import { Button } from '@/shared/ui/Button/Button'
import { useLogoutMutation, useMeQuery } from '@/services/AuthService'
import { useRouter } from 'next/router'
import { InctagramPath } from '@/shared/api/path'

const Profile: NextPageWithLayout = () => {
    const { t } = useTranslation('profile')
    const router = useRouter()

    const { data: photos, error, isLoading, isError } = useFetchUserProfileQuery(9)
    const { data: meData } = useMeQuery()
    const [logout, { isLoading: logoutLoading }] = useLogoutMutation()

    if (isLoading || logoutLoading) return <LoaderScreen variant={'loader'} />

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Index' />
            </Head>
            <div className={cls.profilePage}>
                <div className={cls.profilePage_header}>
                    <div className={cls.header_photo}>
                        <Image src={ProfilePhoto} alt={'profile-photo'} width={204} height={204} />
                    </div>
                    <div className={cls.header_info}>
                        <div className={cls.info_control}>
                            <div>{meData && meData.userName}</div>
                            <Button theme={'primaryWhite'} onClick={() => {}}>
                                {t('ProfileSettings')}
                            </Button>
                        </div>
                        <div className={cls.info_numbers}>
                            <div className={cls.numbers_item}>
                                <div>2218</div>
                                <div>{t('Subscriptions')}</div>
                            </div>
                            <div className={cls.numbers_item}>
                                <div>2218</div>
                                <div>{t('Subscribers')}</div>
                            </div>
                            <div className={cls.numbers_item}>
                                <div>2218</div>
                                <div>{t('Publications')}</div>
                            </div>
                        </div>
                        <div className={cls.info_description}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </div>
                    </div>
                </div>
                <div className={cls.profilePage_content}>
                    <div className={cls.content_list}>
                        {photos &&
                            photos.map((photo) => {
                                return (
                                    <div key={photo.id} className={cls.list_item}>
                                        {/*{photo.title}*/}

                                        {/*<Image*/}
                                        {/*    src={photo.url}*/}
                                        {/*    alt={'profile-photo'}*/}
                                        {/*    width={234}*/}
                                        {/*    height={234}*/}
                                        {/*/>*/}

                                        <img
                                            src={photo.url}
                                            alt='gallery-photo'
                                            width={265}
                                            height={265}
                                        />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

Profile.getLayout = getSidebarLayout
export default Profile
