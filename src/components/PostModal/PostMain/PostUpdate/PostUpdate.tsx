import cls from './PostUpdate.module.scss'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import DefaultProfileAvatar from '../../../../../public/assets/images/default-avatar.png'
import React, { useState } from 'react'
import { DottedMenu } from '@/shared/ui/DottedMenu/DottedMenu'

import EditIcon from '../../../../../public/assets/icons/edit-icon.svg'
import TrashIcon from '../../../../../public/assets/icons/trash-icon.svg'
import Like from '../../../../../public/assets/icons/like.svg'
import Send from '../../../../../public/assets/icons/send.svg'
import AddToFavorite from '../../../../../public/assets/icons/addToFavorite1.svg'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/Button/Button'
import { Comment } from '@/components/PostModal/Comment/Comment'
import { Textarea } from '@/shared/ui/Textarea/Textarea'

export const PostUpdate = ({ setUpdate }: PostUpdatedPropsType) => {
    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<>({
        defaultValues: {}
    })

    return (
        <>
            <div className={cls.postModal_mainBox}>
                <div className={cls.updatePostModal_header}>
                    <div className={cls.modal_headerTitle}>Edit Post</div>
                    <div className={cls.closeButton}>
                        <button
                            onClick={() => {
                                setUpdate(false)
                                console.log('nazhal')
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
                <div className={cls.updatePostModal_body}>
                    <div className={cls.postModal_image}></div>
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
                        <form className={cls.updateDesc}>
                            <div className={cls.textAreaBlock}>
                                <div className={cls.description}>Add publication descriptions</div>
                                <div>
                                    <Controller
                                        name={'update-description'}
                                        control={control}
                                        render={({ field }: any) => (
                                            <Textarea
                                                {...field}
                                                placeholder={''}
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value)
                                                }}
                                                error={errors.aboutMe?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={cls.lettersCount}>200/500</div>
                            </div>
                            <div className={cls.buttonBlock}>
                                <Button type={'submit'} theme={'primary'}>
                                    Publish
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export interface PostUpdatedPropsType {
    setUpdate: (update: boolean) => void
}
