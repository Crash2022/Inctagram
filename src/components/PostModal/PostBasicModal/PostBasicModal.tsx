import React, { ReactElement } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import { useTranslation } from 'react-i18next'

interface AddPostBasicModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: ReactElement
    headerTitle: string
    isPrevious?: boolean
    isNext?: boolean
    isCancelBtn?: boolean
    prevFunc?: () => void
    nextFunc?: () => void
    modalWidth?: string
    isPhotoUploaded?: boolean
}

export const PostBasicModal = ({
    open,
    setOpen,
    children,
    headerTitle,
    isPrevious,
    isNext,
    isCancelBtn,
    prevFunc,
    nextFunc,
    modalWidth,
    isPhotoUploaded
}: AddPostBasicModalProps) => {
    const { t } = useTranslation('add-post-modal')

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            {children}
        </CustomModal>
    )
}
