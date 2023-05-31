import React, { useState } from 'react'
import cls from './PublicationContent.module.scss'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import DefaultProfileAvatar from '../../../../public/assets/images/default-avatar.png'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
// import { ControlledTextarea } from '@/shared/ui/Controlled/ControlledTextarea'

interface PublicationContentProps {
    postPhoto: string
}

export const PublicationContent = ({ postPhoto }: PublicationContentProps) => {
    const { t } = useTranslation('add-post-modal')
    const { data: profileData } = useGetProfileDataQuery()

    const [description, setDescription] = useState<string>('')

    return (
        <div className={cls.publicationModal_content}>
            <div className={cls.content_image}>
                <Image src={postPhoto} alt={'post-photo'} width={500} height={500} />
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
                        <div className={cls.header_userName}>
                            {profileData && profileData.userName}
                        </div>
                    </div>
                    <div className={cls.info_textarea}>
                        {/* <ControlledTextarea */}
                        {/*    divClassName={cls.description} */}
                        {/*    name={'description'} */}
                        {/*    placeholder={t('Description')} */}
                        {/*    control={control} */}
                        {/*    error={errors.description?.message} */}
                        {/* /> */}

                        <Textarea
                            placeholder={t('Description')}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.currentTarget.value)
                            }}
                        />
                    </div>
                </div>
                <div className={cls.publication_addLocation}>Add Location</div>
                <div className={cls.publication_location}>Location</div>
            </div>
        </div>

        // <div className={cls.publicationModal_mainBox}>
        //     <div className={cls.publicationModal_content}>
        //         <div className={cls.content_image}>
        //             <img src={props.selectedImage} alt='Selected' />
        //         </div>
        //         <div className={cls.content_right}>
        //             {userAvatar && <img src={userAvatar} alt='User Avatar' />}
        //             <div className={cls.content_description}>Add publication description</div>
        //             <textarea
        //                 className={cls.content_textArea}
        //                 value={description}
        //                 onChange={(e) => {
        //                     setDescription(e.target.value)
        //                 }}
        //             />
        //             <div className={cls.content_location}>
        //                 <Image
        //                     src='/assets/icons/location.svg'
        //                     alt='Location'
        //                     width={50}
        //                     height={50}
        //                 />
        //                 Add location
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
