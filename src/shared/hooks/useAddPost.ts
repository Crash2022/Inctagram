import { useState } from 'react'
import { CroppedAreaType } from '@/shared/types/image-crop-types'
import { getCroppedImg } from '@/shared/utils/getCroppedImg'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { useCreatePostMutation, useUploadImageToPostMutation } from '@/services/UserPostsService'
import { applyPresetOnImage } from 'instagram-filters'
import { CreatePost, UploadPostImage } from '@/shared/types/posts-types'

// export type CurrentImageFilterType = 'normal' | 'inkwell' | 'brooklyn'

export const useAddPost = () => {
    const { t } = useTranslation('add-post-modal')
    const { enqueueSnackbar } = useSnackbar()

    const [createPost, { isLoading: postIsLoading }] = useCreatePostMutation()
    const [uploadImageToPost, { isLoading: imageIsUploading }] = useUploadImageToPostMutation()

    const [uploadImageResponse, setUploadImageResponse] = useState<UploadPostImage | null>(null)

    // состояние модальных окон
    const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false)
    const [isCropImageModalOpen, setIsCropImageModalOpen] = useState<boolean>(false)
    const [isImageFiltersModalOpen, setIsImageFiltersModalOpen] = useState<boolean>(false)
    const [isPublicationModalOpen, setIsPublicationModalOpen] = useState<boolean>(false)

    // стейты для изображений
    const [isPhotoUploaded, setIsPhotoUploaded] = useState<boolean>(false)
    const [postImage, setPostImage] = useState<string>('')
    const [croppedImage, setCroppedImage] = useState<string>('')
    const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null)
    const [croppedImageForFilter, setCroppedImageForFilter] = useState<string>('')
    // const [currentImageFilter, setCurrentImageFilter] = useState<CurrentImageFilterType>('normal')
    const [isImageFiltersLoading, setIsImageFiltersLoading] = useState<boolean>(false)

    // для сетки фильтров (нужно зарефакторить эту дичь!?)
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
        if(croppedAreaPixels === null){
            console.error('Cropped area is null')
            return
        }
        try {
            const { file, url } = await getCroppedImg(postImage, croppedAreaPixels, rotation) as any
            setCroppedImage(url) // оригинал кадрированного изображения
            setCroppedImageForFilter(url) // изображение для модалки с фильтрами
            setCroppedImageFile(file) // формирование тип 'файл' для дальнейших действий

            setFilterExampleTwo(url) // для сетки с примерами фильтров
            setFilterExampleThree(url) // для сетки с примерами фильтров
            setFilterExampleFour(url) // для сетки с примерами фильтров
            setFilterExampleFive(url) // для сетки с примерами фильтров
            setFilterExampleSix(url) // для сетки с примерами фильтров
            setFilterExampleSeven(url) // для сетки с примерами фильтров
            setFilterExampleEight(url) // для сетки с примерами фильтров
            setFilterExampleNine(url) // для сетки с примерами фильтров
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
            const image = document.querySelector<HTMLImageElement>('#CroppedImageForFilter')
            if (!image) {
                throw new Error('Image not found');
            }
            const blob = await applyPresetOnImage(image, filterName())
            if (!blob) {
                throw new Error('Blob not found');
            }

            const file = new File([blob], "filteredImage.jpg");
            setCroppedImageFile(file)
            setCroppedImageForFilter((image.src = window.URL.createObjectURL(blob)))
        } catch (error) {
            console.log('error filter', error)
        }
    }

    const applyImageFilterToExample = async (imgId: string, filterName: any, stateName: any) => {
        try {
            const image = document.querySelector<HTMLImageElement>(`#${imgId}`)
            if (!image) {
                throw new Error('Image not found');
            }
            const blob = await applyPresetOnImage(image, filterName())
            if (!blob) {
                throw new Error('Blob not found');
            }
            const file = new File([blob], "filteredImageExample.jpg");
            stateName((image.src = window.URL.createObjectURL(file)))
        } catch (error) {
            console.log('error filter', error)
        } finally {
            // setIsImageFiltersLoading(false)
        }
    }


    // переход к публикации
    const goFromImageFiltersToPublicationModalHandler = async () => {
        console.log('croppedImageForFilter', croppedImageForFilter)

        const file = croppedImageFile
        console.log('file', file)

        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            // загрузка изображения на бэкенд
            try {
                const imageResult = await uploadImageToPost(formData)
                if ('data' in imageResult) {
                    setUploadImageResponse(imageResult.data)
                }

                console.log('imageResult', imageResult)
            } catch (e) {
                console.log('imageResult error', e)
            }
        }

        // переход к публикации
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
                const uploadId = uploadImageResponse?.images?.[0]?.uploadId ?? ''; // Use the first item and a default value in case of undefined/null

                if (!uploadId) {
                    throw new Error("Upload ID is undefined");
                }

                const publishObj: CreatePost = {
                    description,
                    childrenMetadata: [{ uploadId }]
                }

                console.log('publishObj', publishObj)
                const publish = await createPost(publishObj)
                console.log('publish', publish)

                setIsPublicationModalOpen(false)
                setPostImage('')
                setCroppedImage('')
                setCroppedImageForFilter('')
                setDescription('')
                setIsPhotoUploaded(false)
                setCroppedImageFile(null)

                enqueueSnackbar(t('Snackbar_PostAdded'), {
                    variant: 'success',
                    autoHideDuration: 3000
                })
            } catch (error) {
                console.log('publicationHandler error', error)
            }
        } else {
            setDescriptionError(t('DescriptionNull') ?? "Error: Description is null")
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
        imageIsUploading,
        applyImageFilter,
        applyImageFilterToExample,
        isImageFiltersLoading,
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
