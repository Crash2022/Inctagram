import Head from 'next/head'
import cls from './Profile.module.scss'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import DefaultProfileAvatar from '../../../public/assets/images/default-avatar.png'
import { useMeQuery } from '@/services/AuthService'
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink'
import { InctagramPath } from '@/shared/api/path'
import { useFetchUserProfilePhotosQuery } from '@/services/UserProfilePhotosService'
import { useGetProfileDataQuery } from '@/services/UserProfileService'

const Profile: NextPageWithLayout = () => {
    const { t } = useTranslation('profile-home')

    const { data: photos, error, isLoading, isError } = useFetchUserProfilePhotosQuery(12)
    const { data: meData, isLoading: meDataIsLoading } = useMeQuery()
    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()

    if (isLoading) return <LoaderScreen variant={'loader'} />
    if (profileDataIsLoading) return <LoaderScreen variant={'loader'} />

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Home' />
            </Head>
            <div className={cls.profilePageHome}>
                <div className={cls.profilePage_header}>
                    <div className={cls.header_photo}>
                        <img
                            src={
                                profileData && profileData.avatars.length === 0
                                    ? DefaultProfileAvatar
                                    : profileData.avatars[0].url
                            }
                            alt={'profile-avatar'}
                            width={204}
                            height={204}
                        />
                    </div>
                    <div className={cls.header_info}>
                        <div className={cls.info_control}>
                            <div>{meData && meData.userName}</div>
                            <ButtonLink
                                theme={'primaryWhite'}
                                href={InctagramPath.PROFILE.SETTINGS}
                                title={t('ProfileSettings')}
                                className={cls.settings}
                            />
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
                                        {/* <Image */}
                                        {/*    src={photo.url} */}
                                        {/*    alt={'gallery-photo'} */}
                                        {/*    width={265} */}
                                        {/*    height={265} */}
                                        {/* /> */}

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
