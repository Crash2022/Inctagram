import React, { useState, useEffect } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import cls from './PublicationContent.module.scss'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'

interface PublicationContentProps {
    postPhoto: string
    // open: boolean
    // setOpen: (value: boolean) => void
    // selectedImage: any
}

export const PublicationContent = ({ postPhoto }: PublicationContentProps) => {
    const { t } = useTranslation('add-post-modal')
    const { data: profileData } = useGetProfileDataQuery()

    const [description, setDescription] = useState('')

    // useEffect(() => {
    //     console.log(profileData)
    //     if (isSuccess && profileData && profileData.avatars[1]) {
    //         setUserAvatar(profileData.avatars[0].url)
    //         setUserName(profileData.userName)
    //     }
    // }, [isSuccess, profileData])

    return (
        <div className={cls.publicationModal_content}>
            <div className={cls.content_image}>
                <Image src={postPhoto} alt={'post-photo'} width={500} height={500} />
            </div>
            <div className={cls.content_publication}></div>
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
