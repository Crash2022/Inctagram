import React, { ChangeEvent, useState } from 'react'
import cls from './AddPostContent.module.scss'
import ImageIcon from '../../../../public/assets/icons/img-icon.svg'
import Image from 'next/image'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'

export const AddPostContent = () => {
    const { t } = useTranslation('add-post-modal')
    const { enqueueSnackbar } = useSnackbar()

    const [postPhoto, setPostPhoto] = useState<string>('')
    const [isAvaBroken, setIsAvaBroken] = useState<boolean>(false)
    // const [isCropImageModalOpen, setIsCropImageModalOpen] = useState<boolean>(false)

    const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0]

            if (file && file.size < 1000000) {
                console.log('file', file)

                const formData = new FormData()
                formData.append('file', file)
                setPostPhoto(URL.createObjectURL(file))
            } else {
                enqueueSnackbar(t('Snackbar_LargeImageSize'), {
                    variant: 'error',
                    autoHideDuration: 3000
                })
            }
        }
    }

    const imageErrorHandler = () => {
        setIsAvaBroken(true)
        enqueueSnackbar(t('Snackbar_ErrorImage'), {
            variant: 'error',
            autoHideDuration: 3000
        })
    }

    return (
        <div className={cls.addPostModal_content}>
            <div className={cls.content_image}>
                {postPhoto === '' ? (
                    <ImageIcon width={48} height={48} />
                ) : (
                    <Image
                        src={postPhoto}
                        alt={'post-photo'}
                        // id={'Post_Photo'}
                        width={220}
                        height={220}
                        onError={imageErrorHandler}
                        quality={100}
                        // priority
                    />
                )}
            </div>
            <div className={cls.content_addButton}>
                <InputFile
                    id={'Upload_Photo'}
                    title={t('AddPhotoButton')}
                    onChangeUpload={uploadPhotoHandler}
                />
            </div>
        </div>
    )
}
