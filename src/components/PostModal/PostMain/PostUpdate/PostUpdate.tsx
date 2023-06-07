import React, { useState } from 'react'
import cls from './PostUpdate.module.scss'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import DefaultProfileAvatar from '../../../../../public/assets/images/default-avatar.png'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/Button/Button'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import { useTranslation } from 'next-i18next'

interface PostUpdatedPropsType {
    setUpdate: (update: boolean) => void
}
export const PostUpdate = ({ setUpdate }: PostUpdatedPropsType) => {
    const { t } = useTranslation('post-modal')

    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()
    const [description, setDescription] = useState<string>('')

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        defaultValues: {}
    })

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
                                <div className={cls.description}>{t('AddPostPublication')}</div>
                                <div>
                                    <Controller
                                        name={'update-description'}
                                        control={control}
                                        render={({ field }: any) => (
                                            <Textarea
                                                {...field}
                                                placeholder={''}
                                                value={description}
                                                onChange={(value) => {
                                                    setDescription(value.currentTarget.value)
                                                }}
                                                // error={errors.aboutMe?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={cls.lettersCount}>{description.length}/500</div>
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
