import React, { ChangeEvent, useState } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import cls from './AddPostModal.module.scss'
import { useTranslation } from 'react-i18next'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import ImageIcon from '../../../../public/assets/icons/img-icon.svg'
import { useSnackbar } from 'notistack'
import Image from 'next/image'
import { ImageCropModal } from '@/components/AddPost/ImageCropModal/ImageCropModal'

interface AddPostModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    header: string
    extraCallback?: () => void
    children?: any
}

export const AddPostModal = (props: AddPostModalProps) => {
    const { t } = useTranslation('add-post-modal')
    const { enqueueSnackbar } = useSnackbar()

    const [postPhoto, setPostPhoto] = useState<string>('')
    const [isAvaBroken, setIsAvaBroken] = useState<boolean>(false)
    const [isCropImageModalOpen, setIsCropImageModalOpen] = useState<boolean>(false)

    const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0]

            if (file && file.size < 1000000) {
                console.log('file', file)

                const formData = new FormData()
                formData.append('file', file)
                setPostPhoto(URL.createObjectURL(file))

                // try {
                //     // setPostPhoto(URL.createObjectURL(file))
                //     // await router.push(InctagramPath.PROFILE.PROFILE)
                //
                //     // setUserAvatar(
                //     //     profileData.avatars.length !== 0
                //     //         ? profileData.avatars[0].url
                //     //         : '/assets/images/default-avatar.png'
                //     // )
                //
                //     // location.reload() // принудительная перезагрузка компоненты
                // } catch {
                //     enqueueSnackbar(t('Snackbar_ErrorAvatar'), {
                //         variant: 'error',
                //         autoHideDuration: 3000
                //     })
                // }
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
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
        >
            <ImageCropModal
                open={isCropImageModalOpen}
                setOpen={setIsCropImageModalOpen}
                header={t('Crop_HeaderTitle')}
            />
            <div className={cls.addPostModal_mainBox}>
                <div className={cls.addPostModal_header}>
                    <div>{props.header}</div>
                    <div
                        className={cls.header_cancel}
                        onClick={() => {
                            props.setOpen(false)
                        }}
                    >
                        X
                    </div>
                </div>
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

                        {/*<button*/}
                        {/*    onClick={() => {*/}
                        {/*        // props.setOpen(false)*/}
                        {/*        setIsCropImageModalOpen(true)*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Crop*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}
