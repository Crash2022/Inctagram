import Head from 'next/head'
import cls from './Profile.module.scss'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import DefaultProfileAvatar from '../../../public/assets/images/default-avatar.png'
import { useMeQuery } from '@/services/AuthService'
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink'
import { InctagramPath } from '@/shared/api/path'
import { useFetchUserProfilePhotosQuery } from '@/services/UserProfilePhotosService'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
// import { profileApi } from '@/shared/api/profile-api'
// import { Photo } from '@/models/profile-types'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import React, { useState } from 'react'
// import { DottedMenu } from '@/shared/ui/DottedMenu/DottedMenu'
// import EditIcon from '../../../public/assets/icons/edit-icon.svg'
// import TrashIcon from '../../../public/assets/icons/trash-icon.svg'
// import dynamic from 'next/dynamic'

// пример LazyLoading
// const PhotoCard = dynamic(() => import('path here').then(module => module.PhotoCard))

// export const getStaticProps = async () => {
//     const photos = await profileApi.getProfilePhotos()
//
//     if (!photos) {
//         return {
//             notFound: true
//         }
//     }
//
//     return {
//         props: {
//             photos
//         },
//         revalidate: 100 // перезапрос данных через указанное время (в секундах)
//     }
// }

// export const getServerSideProps = async ({ res }) => {
//     // перезапрос данных через указанное время stale-while-revalidate (в секундах)
//     // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=600')
//     const photos = await profileApi.getProfilePhotos()
//
//     // console.log(photos, 'backend')
//
//     if (!photos) {
//         return {
//             notFound: true
//         }
//     }
//
//     // данные из стора можно достать с помощью wrapper.useWrappedStore
//     // чтобы не было "морганий" страницы, если роут защищён
//     // if (!me) {
//     //     return {
//     //         redirect: {
//     //             destination: '/login',
//     //             permanent: false
//     //         }
//     //     }
//     // }
//
//     return {
//         props: {
//             photos
//         }
//     }
// }

// type ProfileProps = {
//     photos: Photo[]
// }

const Profile: NextPageWithLayout = () => {
    const { t } = useTranslation('profile-home')

    // для DottedMenu
    // const [menuItems, setMenuItems] = useState([
    //     {
    //         id: 1,
    //         icon: EditIcon,
    //         title: 'EditPost',
    //         func: () => {
    //             alert('Edit Post')
    //         }
    //     },
    //     {
    //         id: 2,
    //         icon: TrashIcon,
    //         title: 'DeletePost',
    //         func: () => {
    //             alert('Delete Post')
    //         }
    //     }
    // ])
    // <DottedMenu menuItems={menuItems} />

    // const { photos } = props
    const { data: photos, error, isLoading, isError } = useFetchUserProfilePhotosQuery(12)
    const { data: meData, isLoading: meDataIsLoading } = useMeQuery()
    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()

    if (profileDataIsLoading) return <LoaderScreen variant={'circle'} />

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Home' />
            </Head>
            <div className={cls.profilePageHome}>
                <div className={cls.profilePage_header}>
                    <div className={cls.header_photo}>
                        <Image
                            src={
                                profileData && profileData.avatars.length === 0
                                    ? DefaultProfileAvatar
                                    : profileData.avatars[0].url
                            }
                            // src={DefaultProfileAvatar}
                            alt={'profile-avatar'}
                            width={204}
                            height={204}
                            quality={100}
                            // priority
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
                            photos.map((photo, index) => {
                                return (
                                    <div key={index} className={cls.list_item}>
                                        {/*<Image*/}
                                        {/*    src={photo.url}*/}
                                        {/*    alt={'gallery-photo'}*/}
                                        {/*    width={265}*/}
                                        {/*    height={265}*/}
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
