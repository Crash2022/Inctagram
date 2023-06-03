import { useState } from 'react'
import { CroppedAreaType } from '@/models/image-crop-types'
import { getCroppedImg } from '@/shared/utils/getCroppedImg'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { useCreatePostMutation, useUploadImageToPostMutation } from '@/services/UserPostsService'
import { applyPresetOnImage } from 'instagram-filters'

// export type CurrentImageFilterType = 'normal' | 'clarendon' | 'moon'

export const useAddPost = () => {
    const { t } = useTranslation('add-post-modal')
    const { enqueueSnackbar } = useSnackbar()

    const [createPost, { isLoading: postIsLoading }] = useCreatePostMutation()
    const [uploadImageToPost, { isLoading: imageIsLoading }] = useUploadImageToPostMutation()

    const [isPhotoUploaded, setIsPhotoUploaded] = useState<boolean>(false)

    // const [croppedImageFile, setCroppedImageFile] = useState(null)
    const [postImage, setPostImage] = useState<string>('')
    const [croppedImage, setCroppedImage] = useState<string>('')
    const [croppedImageForFilter, setCroppedImageForFilter] = useState<string>('')
    // const [currentImageFilter, setCurrentImageFilter] = useState<CurrentImageFilterType>('normal')
    const [isImageFiltersLoading, setIsImageFiltersLoading] = useState<boolean>(false)

    // для сетки фильтров (нужно зарефакторить эту дичь!!!)
    const [filterExampleTwo, setFilterExampleTwo] = useState<string>('')
    const [filterExampleThree, setFilterExampleThree] = useState<string>('')
    const [filterExampleFour, setFilterExampleFour] = useState<string>('')
    const [filterExampleFive, setFilterExampleFive] = useState<string>('')
    const [filterExampleSix, setFilterExampleSix] = useState<string>('')
    const [filterExampleSeven, setFilterExampleSeven] = useState<string>('')
    const [filterExampleEight, setFilterExampleEight] = useState<string>('')
    const [filterExampleNine, setFilterExampleNine] = useState<string>('')

    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaType | null>(null)
    const [rotation, setRotation] = useState<number>(0)

    const [description, setDescription] = useState<string>('')
    const [descriptionError, setDescriptionError] = useState<string>('')

    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)
    const [isCropImageModalOpen, setIsCropImageModalOpen] = useState<boolean>(false)
    const [isImageFiltersModalOpen, setIsImageFiltersModalOpen] = useState<boolean>(false)
    const [isPublicationModalOpen, setIsPublicationModalOpen] = useState<boolean>(false)

    // переход к кадрированию изображения
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
    const goFromCropToAddImageModalHandler = () => {
        setIsCropImageModalOpen(false)
        setIsAddPostOpen(true)
    }

    // переход к фильтрам
    const goFromCropToImageFiltersModalHandler = async () => {
        // получение кадрированного изображения
        try {
            const { file, url } = await getCroppedImg(postImage, croppedAreaPixels, rotation)
            setCroppedImage(await url) // оригинал кадрированного изображения
            setCroppedImageForFilter(await url) // для модалки с фильтрами
            // setCroppedImageFile(await file) // возможно нужно будет ?!

            setFilterExampleTwo(await url) // для сетки с примерами фильтров
            setFilterExampleThree(await url) // для сетки с примерами фильтров
            setFilterExampleFour(await url) // для сетки с примерами фильтров
            setFilterExampleFive(await url) // для сетки с примерами фильтров
            setFilterExampleSix(await url) // для сетки с примерами фильтров
            setFilterExampleSeven(await url) // для сетки с примерами фильтров
            setFilterExampleEight(await url) // для сетки с примерами фильтров
            setFilterExampleNine(await url) // для сетки с примерами фильтров
        } catch (e) {
            console.error('crop error', e)
        }

        // переход в другую модалку
        setIsImageFiltersModalOpen(true)
        setIsCropImageModalOpen(false)
    }
    const goFromImageFiltersToCropModalHandler = () => {
        setIsImageFiltersModalOpen(false)
        setIsCropImageModalOpen(true)
    }
    // функиця для применения фильтра к фотографии
    const applyImageFilter = async (filterName: any) => {
        try {
            const image = document.querySelector('#CroppedImageForFilter')
            // Function 'applyPresetOnImage' is returning a Blob
            const blob = await applyPresetOnImage(image, filterName())
            // image.src = window.URL.createObjectURL(blob)
            setCroppedImageForFilter((image.src = window.URL.createObjectURL(blob)))

            // if (currentImageFilter === filterName) return
            // setCurrentImageFilter(filterName)
        } catch (error) {
            console.log('error filter', error)
        }
    }

    // для сетки с примерами фильтров
    const applyImageFilterToExample = async (imgId: string, filterName: any, stateName: any) => {
        setIsImageFiltersLoading(true)
        try {
            const image = document.querySelector(`#${imgId}`)
            // const image = document.getElementById(imgId)
            const blob = await applyPresetOnImage(image, filterName())
            stateName((image.src = window.URL.createObjectURL(blob)))
            // setIsImageFiltersLoading(false)
        } catch (error) {
            console.log('error filter', error)
        } finally {
            setIsImageFiltersLoading(false)
        }
    }

    // переход к публикации
    const goFromImageFiltersToPublicationModalHandler = () => {
        setIsImageFiltersModalOpen(false)
        setIsPublicationModalOpen(true)
    }
    const goFromPublicationModalToImageFiltersHandler = () => {
        setIsPublicationModalOpen(false)
        setIsImageFiltersModalOpen(true)
    }

    // публикция поста
    const publicationHandler = async () => {
        const trimValue = description.trim()

        if (trimValue && trimValue.length <= 500) {
            try {
                // добавление описания
                const publish = await createPost({ description })
                console.log('publish', publish)

                // добавление фотографии
                // if (croppedImageFile !== null) {
                //     const uploadImage = await uploadImageToPost(croppedImageFile)
                //     console.log('uploadImage', uploadImage)
                // }
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
        // croppedImageFile,
        // setCroppedImageFile,
        postImage,
        setPostImage,
        croppedImage,
        // setCroppedImage,
        croppedImageForFilter,
        setCroppedImageForFilter,
        isImageFiltersLoading,
        // setIsImageFiltersLoading,
        // croppedAreaPixels,
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
        goFromCropToAddImageModalHandler,
        goFromCropToImageFiltersModalHandler,
        goFromImageFiltersToCropModalHandler,
        goFromImageFiltersToPublicationModalHandler,
        goFromPublicationModalToImageFiltersHandler,
        publicationHandler,
        postIsLoading,
        // imageIsLoading,
        applyImageFilter,
        applyImageFilterToExample,

        filterExampleTwo,
        setFilterExampleTwo,
        filterExampleThree,
        setFilterExampleThree,
        filterExampleFour,
        setFilterExampleFour,
        filterExampleFive,
        setFilterExampleFive,
        filterExampleSix,
        setFilterExampleSix,
        filterExampleSeven,
        setFilterExampleSeven,
        filterExampleEight,
        setFilterExampleEight,
        filterExampleNine,
        setFilterExampleNine
    }
}
