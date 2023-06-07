import React, { useState } from 'react'
import cls from './PostUpdate.module.scss'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import DefaultProfileAvatar from '../../../../../public/assets/images/default-avatar.png'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/Button/Button'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import { useTranslation } from 'next-i18next'
import { PostType, UpdatePostPayloadType } from '@/models/posts-types'
import { useUpdatePostMutation } from '@/services/UserPostsService'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

interface PostUpdatedPropsType {
    setUpdate: (update: boolean) => void
    post: PostType
}
export const PostUpdate = ({ setUpdate, post }: PostUpdatedPropsType) => {
    const { t } = useTranslation('post-modal')

    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()

    const [updateProfile, { data: updateProfileData, error, isError, isLoading }] =
        useUpdatePostMutation()

    const [text, setText] = useState<string>(post.description)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        defaultValues: {
            description: post.description,
            postId: post.id
        }
    })

    const onSubmit: SubmitHandler<UpdatePostPayloadType> = async (
        submitData: UpdatePostPayloadType
    ) => {
        console.log('submit updatePost', submitData)
        try {
            const res = await updateProfile(submitData)
            console.log('updatePost response', res)
            setUpdate(false)
        } catch (error: any) {
            console.log('updatePost error', error)
        }
    }

    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <>
            <div className={cls.postModal_mainBox}>
                <div className={cls.updatePostModal_header}>
                    <div className={cls.modal_headerTitle}>{t('EditPost')}</div>
                    <div className={cls.closeButton}>
                        <button
                            onClick={() => {
                                setUpdate(false)
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
                <div className={cls.updatePostModal_body}>
                    <div className={cls.postModal_image}>
                        <Image
                            src={post.images[0].url}
                            alt={'post-photo'}
                            width={575}
                            height={575}
                            priority
                        />
                    </div>
                    <div className={cls.postModal_items}>
                        <div className={cls.header}>
                            <div className={cls.headerTitle}>
                                <div className={cls.profileData}>
                                    <div className={cls.userAvatar}>
                                        <Image
                                            src={
                                                profileData && profileData.avatars.length === 0
                                                    ? DefaultProfileAvatar
                                                    : profileData.avatars[0].url
                                            }
                                            alt={'profile-avatar'}
                                            width={35}
                                            height={35}
                                            quality={100}
                                        />
                                    </div>
                                    <div className={cls.userName}>{profileData.userName}</div>
                                </div>
                            </div>
                        </div>
                        <form className={cls.updateDesc} onSubmit={handleSubmit(onSubmit)}>
                            <div className={cls.textAreaBlock}>
                                <div className={cls.description}>{t('AddPostPublication')}</div>
                                <div>
                                    <Controller
                                        name={'description'}
                                        control={control}
                                        render={({ field }: any) => (
                                            <Textarea
                                                {...field}
                                                placeholder={''}
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value)
                                                    setText(value.currentTarget.value)
                                                }}
                                                error={errors.description?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={cls.lettersCount}>{text.length}/500</div>
                            </div>
                            <div className={cls.buttonBlock}>
                                <Button type={'submit'} theme={'primary'}>
                                    {t('Publish')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
