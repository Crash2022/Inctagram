import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import cls from './SidebarLayout.module.scss'
import Head from 'next/head'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import LinkA from '@/shared/ui/LinkA/LinkA'
import HomeIcon from './../../../public/assets/icons/home-icon.svg'
import AddIcon from './../../../public/assets/icons/add-icon.svg'
import ProfileIcon from './../../../public/assets/icons/profile-icon.svg'
import BookmarkIcon from './../../../public/assets/icons/bookmark-outline.svg'
import Statistics from './../../../public/assets/icons/statistics.svg'
import LogoutIcon from './../../../public/assets/icons/logout-icon.svg'
import { useTranslation } from 'next-i18next'
import { InctagramPath } from '@/shared/api/path'
import { useLogoutMutation } from '@/services/AuthService'
import { useRouter } from 'next/router'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { AddPostBasicModal } from '@/components/AddPost/AddPostBasicModal/AddPostBasicModal'
import { AddPostContent } from '@/components/AddPost/AddPostContent/AddPostContent'
import { ImageCropContent } from '@/components/AddPost/ImageCropContent/ImageCropContent'
import { ImageFiltersContent } from '@/components/AddPost/ImageFiltersContent/ImageFiltersContent'
import { PublicationContent } from '@/components/AddPost/PublicationContent/PublicationContent'
import { CroppedAreaType } from '@/models/image-crop-types'
import { useSnackbar } from 'notistack'
import { getCroppedImg } from '@/shared/utils/getCroppedImg'

export const SidebarLayout = ({ children }: PropsWithChildren) => {
    const { t } = useTranslation('sidebar')
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const [logout, { isSuccess, isLoading }] = useLogoutMutation()

    const isPaid = true // исправить на динамическое значение

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
    const publicationHandler = () => {
        alert('publish')
        // requests here
    }

    useEffect(() => {
        if (isSuccess) void router.push(InctagramPath.AUTH.LOGIN)
    }, [isSuccess])

    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <>
            <Head>
                <title>Inctagram</title>
                <meta name='description' content='Inctagram App' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Header />
            <main className={cls.layoutContainer}>
                <nav>
                    <div className={cls.menuList}>
                        <div className={cls.menuList_top}>
                            <div
                                className={
                                    router.pathname === InctagramPath.PROFILE.HOME
                                        ? cls.menuList_item_active
                                        : cls.menuList_item
                                }
                            >
                                <div>
                                    <HomeIcon />
                                </div>
                                <LinkA
                                    href={InctagramPath.PROFILE.HOME}
                                    text={t('Home')}
                                    className={cls.link}
                                />
                            </div>

                            {/* модалка для добавления фото */}
                            <AddPostBasicModal
                                open={isAddPostOpen}
                                setOpen={setIsAddPostOpen}
                                headerTitle={'AddPost_HeaderTitle'}
                                // isNextForUpload={true} // вариант с выкл. кнопки
                                isNext={true}
                                nextButtonTitle={'Next'}
                                // isCancelBtn={true}
                                nextFunc={goFromAddToCropModalHandler}
                                isPhotoUploaded={isPhotoUploaded}
                            >
                                <AddPostContent
                                    postImage={postImage}
                                    setPostImage={setPostImage}
                                    setIsPhotoUploaded={setIsPhotoUploaded}
                                    // setImageFile={setImageFile}
                                />
                            </AddPostBasicModal>

                            {/* модалка для кадрирования фото */}
                            <AddPostBasicModal
                                open={isCropImageModalOpen}
                                setOpen={setIsCropImageModalOpen}
                                headerTitle={'Crop_HeaderTitle'}
                                isPrevious={true}
                                isNext={true}
                                nextButtonTitle={'Next'}
                                prevFunc={goFromCropToAddPhotoModalHandler}
                                nextFunc={goFromCropToPhotoFiltersModalHandler}
                            >
                                <ImageCropContent
                                    postImage={postImage}
                                    setCroppedAreaPixels={setCroppedAreaPixels}
                                    rotation={rotation}
                                    setRotation={setRotation}
                                />
                            </AddPostBasicModal>

                            {/* модалка для фильтров фото */}
                            <AddPostBasicModal
                                open={isImageFiltersModalOpen}
                                setOpen={setIsImageFiltersModalOpen}
                                headerTitle={'Filters_HeaderTitle'}
                                isPrevious={true}
                                isNext={true}
                                nextButtonTitle={'Next'}
                                prevFunc={goFromPhotoFiltersToCropModalHandler}
                                nextFunc={goFromPhotoFiltersToPublicationModalHandler}
                                modalWidth={'900'}
                            >
                                <ImageFiltersContent croppedImage={croppedImage} />
                            </AddPostBasicModal>

                            {/* модалка для публикации */}
                            <AddPostBasicModal
                                open={isPublicationModalOpen}
                                setOpen={setIsPublicationModalOpen}
                                headerTitle={'Publication_HeaderTitle'}
                                isPrevious={true}
                                isNext={true}
                                nextButtonTitle={'Publish'}
                                prevFunc={goFromPublicationModalToFiltersHandler}
                                nextFunc={publicationHandler}
                                modalWidth={'900'}
                            >
                                <PublicationContent
                                    croppedImage={croppedImage}
                                    description={description}
                                    setDescription={setDescription}
                                    descriptionError={descriptionError}
                                    setDescriptionError={setDescriptionError}
                                />
                            </AddPostBasicModal>

                            <div className={cls.menuList_item}>
                                <div>
                                    <AddIcon />
                                </div>
                                <div
                                    className={cls.link}
                                    onClick={() => {
                                        setIsAddPostOpen(true)
                                    }}
                                >
                                    {t('Add')}
                                </div>
                            </div>
                            <div
                                className={
                                    router.pathname === InctagramPath.PROFILE.PROFILE
                                        ? cls.menuList_item_active
                                        : cls.menuList_item
                                }
                            >
                                <div>
                                    <ProfileIcon />
                                </div>
                                <LinkA
                                    href={InctagramPath.PROFILE.PROFILE}
                                    text={t('Profile')}
                                    className={cls.link}
                                />
                            </div>
                            <div
                                className={
                                    router.pathname === InctagramPath.PROFILE.FAVORITES
                                        ? cls.menuList_item_active
                                        : cls.menuList_item
                                }
                            >
                                <div>
                                    <BookmarkIcon />
                                </div>
                                <LinkA
                                    href={InctagramPath.PROFILE.FAVORITES}
                                    text={t('Favorites')}
                                    className={cls.link}
                                />
                            </div>

                            {isPaid ? (
                                <div
                                    className={
                                        router.pathname === InctagramPath.PROFILE.STATISTICS
                                            ? cls.menuList_item_active
                                            : cls.menuList_item
                                    }
                                >
                                    <div className={cls.item_image}>
                                        <Statistics />
                                    </div>
                                    <LinkA
                                        href={InctagramPath.PROFILE.STATISTICS}
                                        text={t('Statistics')}
                                        className={cls.link}
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className={cls.menuList_bottom}>
                            <div
                                className={cls.menuList_item}
                                onClick={() => {
                                    logout().then((res) => {
                                        console.log(res)
                                    })
                                    localStorage.removeItem('accessToken')
                                    void router.push(InctagramPath.AUTH.LOGIN)
                                }}
                            >
                                <div className={cls.item_image}>
                                    <LogoutIcon />
                                </div>
                                <div className={cls.link}>{t('LogOut')}</div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={cls.childrenClass}>{children}</div>
            </main>
            <Footer />
        </>
    )
}

export const getSidebarLayout = (page: ReactElement) => {
    return <SidebarLayout>{page}</SidebarLayout>
}
