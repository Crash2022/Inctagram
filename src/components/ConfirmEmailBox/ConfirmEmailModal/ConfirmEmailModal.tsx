import React from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import { Button } from '@/shared/ui/Button/Button'
import s from './ConfirmEmailModal.module.scss'

interface props {
    open: boolean
    setOpen: (value: boolean) => void
}

export const ConfirmEmailModal = ({ open, setOpen }: props) => {
    const onCloseHandler = () => {
        setOpen(false)
    }

    return (
        <CustomModal open={open} onClose={onCloseHandler}>
            <div className={s.mainBox}>
                <header className={s.header}>
                    <span className={s.title}>Email sent</span>
                    <button className={s.closeButton} onClick={onCloseHandler}>
                        &#10006;
                    </button>
                </header>
                <div className={s.body}>
                    We have sent a link to confirm your email to epam@epam.com
                </div>
                <div className={s.buttonWrapper}>
                    <Button onClick={onCloseHandler}>OK</Button>
                </div>
            </div>
        </CustomModal>
    )
}
