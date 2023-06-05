import React, { ChangeEvent, useState } from 'react'
import cls from './AddPostContent.module.scss'
import ImageIcon from '../../../../public/assets/icons/img-icon.svg'
import Image from 'next/image'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'

interface AddPostContentProps {
    postImage: string
    setPostImage: (image: string) => void
    setIsPhotoUploaded: (value: boolean) => void
}

export const AddPostContent = ({
    postImage,
    setPostImage,
    setIsPhotoUploaded
}: AddPostContentProps) => {
    const { t } = useTranslation('add-post-modal')
    const { enqueueSnackbar } = useSnackbar()

    const [isImageBroken, setIsImageBroken] = useState<boolean>(false)

    const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0]
            console.log('post-image', file)

            if (file && file.size < 1000000) {
                const formData = new FormData()
                formData.append('upload-post-image', file)
                setPostImage(URL.createObjectURL(file))
                setIsPhotoUploaded(true)
            } else {
                enqueueSnackbar(t('Snackbar_LargeImageSize'), {
                    variant: 'error',
                    autoHideDuration: 3000
                })
            }
        }
    }

    const imageErrorHandler = () => {
        setIsImageBroken(true)
        enqueueSnackbar(t('Snackbar_ErrorImage'), {
            variant: 'error',
            autoHideDuration: 3000
        })
    }

    return (
        <div className={cls.addPostModal_content}>
            <div className={cls.content_image}>
                {postImage === '' ? (
                    <ImageIcon />
                ) : (
                    <Image
                        src={postImage}
                        alt={'post-photo'}
                        // id={'Post_Photo'}
                        width={220}
                        height={220}
                        onError={imageErrorHandler}
                        quality={100}
                        priority
                    />
                )}
            </div>
            <div className={cls.content_addButton}>
                <InputFile
                    id={'Upload_Photo'}
                    title={t('AddPhotoButton')}
                    onChangeUpload={uploadPhotoHandler}
                    accept={'image/*'}
                    // multiple
                />
            </div>
        </div>
    )
}
