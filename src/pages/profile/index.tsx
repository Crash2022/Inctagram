import Head from 'next/head'
import cls from './Profile.module.scss'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import DefaultProfileAvatar from '../../../public/assets/images/default-avatar.png'
import { useMeQuery } from '@/services/AuthService'
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink'
import { InctagramPath } from '@/shared/api/path'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import React, { useState } from 'react'
import { PostBasicModal } from '@/components/PostModal/PostBasicModal/PostBasicModal'
import { PostContent } from '@/components/PostModal/PostMain/PostContent/PostContent'
import { PostMain } from '@/components/PostModal/PostMain/PostMain'
import { useGetUserPostsQuery } from '@/services/UserPostsService'
import { GetPostsResponse, PostType } from '@/models/posts-types'
import { profileApi } from '@/shared/api/profile-api'
// import dynamic from 'next/dynamic'

// пример LazyLoading
// const PhotoCard = dynamic(() => import('path here').then(module => module.PhotoCard))

// export const getStaticProps = async () => {
//     const posts = await profileApi.getUserProfilePosts()
//
//     if (!posts) {
//         return {
//             notFound: true
//         }
//     }
//
//     return {
//         props: {
//             posts
//         },
//         revalidate: 100 // перезапрос данных через указанное время (в секундах)
//     }
// }

// export const getServerSideProps = async () => {
//     // перезапрос данных через указанное время stale-while-revalidate (в секундах)
//     // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=600')
//
//     // const profile = await profileApi.getUserProfileData()
//     // const posts = await profileApi.getUserProfilePosts(profile.id)
//     const posts = await profileApi.getUserProfilePosts(98)
//
//     // console.log(posts, 'backend posts')
//
//     if (!posts) {
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
//             posts
//         }
//     }
// }

interface ProfileProps {
    posts: GetPostsResponse
}

const Profile: NextPageWithLayout = () => {
    const { t } = useTranslation('profile-home')

    // const { posts } = props
    const { data: meData } = useMeQuery()
    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()
    const {
        data: posts,
        error,
        isLoading: postsIsLoading,
        isError
    } = useGetUserPostsQuery(profileData?.id)

    const [openPostModal, setOpenPostModal] = useState<boolean>(false)

    if (profileDataIsLoading) return <LoaderScreen variant={'circle'} />
    if (postsIsLoading) return <LoaderScreen variant={'circle'} />

    console.log(posts)

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
                                    : profileData?.avatars[0].url
                            }
                            // src={DefaultProfileAvatar}
                            alt={'profile-avatar'}
                            width={204}
                            height={204}
                            quality={100}
                        />
                    </div>
                    <div className={cls.header_info}>
                        <div className={cls.info_control}>
                            <div>{meData?.userName}</div>
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
                        <div className={cls.info_description}>{profileData?.aboutMe}</div>
                    </div>
                </div>
                <div className={cls.profilePage_content}>
                    <div className={cls.content_list}>
                        {posts?.items.map((post: PostType) => {
                            return (
                                <div key={post.id} className={cls.list_item}>
                                    <Image
                                        src={post.images[0].url}
                                        alt={'post-photo'}
                                        width={265}
                                        height={265}
                                        priority
                                        onClick={() => {
                                            setOpenPostModal(true)
                                        }}
                                    />
                                    <PostBasicModal open={openPostModal} setOpen={setOpenPostModal}>
                                        <PostMain post={post} />
                                    </PostBasicModal>
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
