import React from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import cls from './AddPostModal.module.scss'
import { useTranslation } from 'react-i18next'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import ImageIcon from '../../../public/assets/icons/img-icon.svg'

interface AddPostModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    header: string
    extraCallback?: () => void
    children?: any
}

export const AddPostModal = (props: AddPostModalProps) => {
    const { t } = useTranslation('add-post-modal')

    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
        >
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
                        <ImageIcon width={48} height={48} />
                    </div>
                    <div className={cls.content_addButton}>
                        <InputFile title={t('AddPhotoButton')} />
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}
