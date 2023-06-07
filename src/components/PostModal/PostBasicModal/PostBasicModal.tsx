import React, { ReactElement } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'

interface PostBasicModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    // setOpen: () => void
    // setOpen: (postId: number) => void
    children: ReactElement
}

export const PostBasicModal = ({ open, setOpen, children }: PostBasicModalProps) => {
    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
                // setOpen(postId)
                // setOpen()
            }}
        >
            {children}
        </CustomModal>
    )
}
