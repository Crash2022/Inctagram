import React, { useEffect } from 'react'
import cls from './PublicationContent.module.scss'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import DefaultProfileAvatar from '../../../../public/assets/images/default-avatar.png'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

interface PublicationContentProps {
    croppedImage: string
    description: string
    setDescription: (value: string) => void
    descriptionError: string
    setDescriptionError: (value: string) => void
    postIsLoading: boolean
}

export const PublicationContent = ({
    croppedImage,
    description,
    setDescription,
    descriptionError,
    setDescriptionError,
    postIsLoading
}: PublicationContentProps) => {
    const { t } = useTranslation('add-post-modal')
    const { data: profileData } = useGetProfileDataQuery()

    useEffect(() => {
        if (description.length > 500) {
            setDescriptionError(t('DescriptionLimit'))
        } else {
            setDescriptionError('')
        }

        if (description.length > 500) {
            setDescriptionError(t('DescriptionLimit'))
        } else {
            setDescriptionError('')
        }
    }, [description])

    if (postIsLoading) return <LoaderScreen variant={'circle'} />

    return (
        <div className={cls.publicationModal_content}>
            <div className={cls.content_image}>
                <Image src={croppedImage} alt={'post-photo'} width={500} height={500} />
            </div>
            <div className={cls.content_publication}>
                <div className={cls.publication_info}>
                    <div className={cls.info_header}>
                        <div className={cls.header_avatar}>
                            <Image
                                src={
                                    profileData && profileData.avatars.length === 0
                                        ? DefaultProfileAvatar
                                        : profileData.avatars[0].url
                                }
                                alt={'profile-avatar'}
                                width={36}
                                height={36}
                                quality={100}
                            />
                        </div>
                        <div className={cls.header_userName}>{profileData?.userName}</div>
                    </div>
                    <div className={cls.info_textarea}>
                        <Textarea
                            placeholder={t('Description')}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.currentTarget.value)
                            }}
                            error={descriptionError}
                        />
                        <div className={cls.textarea_length}>{description.length} / 500</div>
                    </div>
                </div>
                <div className={cls.publication_addLocation}>Add Location</div>
                <div className={cls.publication_location}>Location</div>
            </div>
        </div>
    )
}
