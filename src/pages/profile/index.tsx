import React, { useState, useCallback } from 'react'
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
import { PostBasicModal } from '@/components/PostModal/PostBasicModal/PostBasicModal'
import { PostMain } from '@/components/PostModal/PostMain/PostMain'
import { useGetUserPostsQuery } from '@/services/UserPostsService'
import { PostType } from '@/shared/types/posts-types'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { setPostId } from '@/store/slices/postSlice'

const Profile: NextPageWithLayout = () => {
    const { t } = useTranslation('profile-home')
    const dispatch = useAppDispatch()

    const { data: meData } = useMeQuery({})
    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery({})

    // Pass undefined to useGetUserPostsQuery when profileData?.id is undefined
    const userPostsQuery = useGetUserPostsQuery(profileData?.id ?? -1)
    const posts = userPostsQuery.data;
    const postsIsLoading = userPostsQuery.isLoading;

    const [openPostModal, setOpenPostModal] = useState<boolean>(false)

    const togglePostModal = useCallback(
        (postId: number) => () => {
            setOpenPostModal(!openPostModal)
            dispatch(setPostId({ postId }))
        },
        []
    )

    if (profileDataIsLoading) return <LoaderScreen variant={'circle'} />
    if (postsIsLoading) return <LoaderScreen variant={'circle'} />

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Home' />
            </Head>

            <PostBasicModal open={openPostModal} setOpen={setOpenPostModal}>
                <PostMain setOpenPostModal={setOpenPostModal} />
            </PostBasicModal>

            <div className={cls.profilePageHome}>
                <div className={cls.profilePage_header}>
                    {profileData && (
                        <div className={cls.header_photo}>
                            <Image
                                src={
                                    profileData.avatars.length === 0
                                        ? DefaultProfileAvatar
                                        : profileData?.avatars[0].url
                                }
                                alt={'profile-avatar'}
                                width={204}
                                height={204}
                                quality={100}
                            />
                        </div>
                    )}
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
                                <div>{posts?.items.length}</div>
                                <div>{t('Publications')}</div>
                            </div>
                        </div>
                        <div className={cls.info_description}>{profileData?.aboutMe}</div>
                    </div>
                </div>
                <div className={cls.profilePage_content}>
                    {posts?.items.length === 0 && (
                        <div className={cls.list_noItems}>{t('NoPosts')}</div>
                    )}
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
                                        onClick={togglePostModal(post.id)}
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
