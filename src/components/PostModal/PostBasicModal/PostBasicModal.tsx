import React, { ReactElement } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'

interface PostBasicModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: ReactElement
}

export const PostBasicModal = ({ open, setOpen, children }: PostBasicModalProps) => {
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
