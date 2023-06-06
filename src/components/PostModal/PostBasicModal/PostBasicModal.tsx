import React, { ReactElement } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'

interface PostBasicModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    // setOpen: () => void
    // setOpen: (postId: number) => void
    postId: number
    children: ReactElement
}

export const PostBasicModal = ({ open, setOpen, postId, children }: PostBasicModalProps) => {
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
