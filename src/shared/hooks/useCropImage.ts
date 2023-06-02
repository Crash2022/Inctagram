import { useState } from 'react'
import { CroppedAreaType } from '@/models/image-crop-types'
import { getCroppedImg } from '@/shared/utils/getCroppedImg'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { useCreatePostMutation, useUploadImageToPostMutation } from '@/services/UserPostsService'

export const useCropImage = () => {
    const { t } = useTranslation('add-post-modal')
    const { enqueueSnackbar } = useSnackbar()

    const [createPost, { isLoading: postIsLoading }] = useCreatePostMutation()
    const [uploadImageToPost, { isLoading: imageIsLoading }] = useUploadImageToPostMutation()

    const [isPhotoUploaded, setIsPhotoUploaded] = useState<boolean>(false)

    const [croppedImageFile, setCroppedImageFile] = useState(null)
    const [postImage, setPostImage] = useState<string>('')
    const [croppedImage, setCroppedImage] = useState<string>('')
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaType | null>(null)
    const [rotation, setRotation] = useState<number>(0)

    const [description, setDescription] = useState<string>('')
    const [descriptionError, setDescriptionError] = useState<string>('')

    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)
    const [isCropImageModalOpen, setIsCropImageModalOpen] = useState<boolean>(false)
    const [isImageFiltersModalOpen, setIsImageFiltersModalOpen] = useState<boolean>(false)
    const [isPublicationModalOpen, setIsPublicationModalOpen] = useState<boolean>(false)

    // перейти к кадрированию изображения
    const goFromAddToCropModalHandler = () => {
        if (!isPhotoUploaded) {
            enqueueSnackbar(t('Snackbar_ImageNotUploaded'), {
                variant: 'error',
                autoHideDuration: 3000
            })
            return
        }
        setIsCropImageModalOpen(true)
        setIsAddPostOpen(false)
    }
    const goFromCropToAddPhotoModalHandler = () => {
        setIsCropImageModalOpen(false)
        setIsAddPostOpen(true)
    }

    // перейти к фильтрам
    const goFromCropToPhotoFiltersModalHandler = async () => {
        // получение кадрированного изображения
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const { file, url } = await getCroppedImg(postImage, croppedAreaPixels, rotation)
            setCroppedImage(await url)
            setCroppedImageFile(await file) // возможно нужно будет для создания поста ?!
            // console.log('crop url', url)
            // console.log('crop file', file)
        } catch (e) {
            console.error('crop error', e)
        }

        // переход в другую модалку
        setIsImageFiltersModalOpen(true)
        setIsCropImageModalOpen(false)
    }
    const goFromPhotoFiltersToCropModalHandler = () => {
        setIsImageFiltersModalOpen(false)
        setIsCropImageModalOpen(true)
    }

    // перейти к публикации
    const goFromPhotoFiltersToPublicationModalHandler = () => {
        setIsImageFiltersModalOpen(false)
        setIsPublicationModalOpen(true)
    }
    const goFromPublicationModalToFiltersHandler = () => {
        setIsPublicationModalOpen(false)
        setIsImageFiltersModalOpen(true)
    }

    // опубликовать пост
    const publicationHandler = async () => {
        const trimValue = description.trim()

        if (trimValue && trimValue.length <= 500) {
            try {
                const publish = await createPost({ description })
                console.log('publish', publish)

                if (croppedImageFile !== null) {
                    const uploadImage = await uploadImageToPost(croppedImageFile)
                    console.log('uploadImage', uploadImage)
                }
            } catch (error) {
                console.log('publicationHandler error', error)
            }
        } else {
            // enqueueSnackbar(t('Snackbar_EmptyDescription'), {
            //     variant: 'error',
            //     autoHideDuration: 3000
            // })
            setDescriptionError(t('DescriptionNull'))
        }
    }

    return {
        isPhotoUploaded,
        setIsPhotoUploaded,
        croppedImageFile,
        setCroppedImageFile,
        postImage,
        setPostImage,
        croppedImage,
        setCroppedImage,
        croppedAreaPixels,
        setCroppedAreaPixels,
        rotation,
        setRotation,
        description,
        setDescription,
        descriptionError,
        setDescriptionError,
        isAddPostOpen,
        setIsAddPostOpen,
        isCropImageModalOpen,
        setIsCropImageModalOpen,
        isImageFiltersModalOpen,
        setIsImageFiltersModalOpen,
        isPublicationModalOpen,
        setIsPublicationModalOpen,
        goFromAddToCropModalHandler,
        goFromCropToAddPhotoModalHandler,
        goFromCropToPhotoFiltersModalHandler,
        goFromPhotoFiltersToCropModalHandler,
        goFromPhotoFiltersToPublicationModalHandler,
        goFromPublicationModalToFiltersHandler,
        publicationHandler
    }
}
