import React from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import cls from './AddPostBasicModal.module.scss'
import { useTranslation } from 'react-i18next'

interface AddPostBasicModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: any
    headerTitle: string
    isPrevious?: boolean
    isNext?: boolean
    isCancelBtn?: boolean
    prevFunc?: () => void
    nextFunc?: () => void
}

export const AddPostBasicModal = ({
    open,
    setOpen,
    children,
    headerTitle,
    isPrevious,
    isNext,
    isCancelBtn,
    prevFunc,
    nextFunc
}: AddPostBasicModalProps) => {
    const { t } = useTranslation('add-post-modal')

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={cls.addPostModal_mainBox}>
                <div className={cls.addPostModal_header}>
                    {isPrevious ? (
                        <div className={cls.header_button} onClick={prevFunc && prevFunc}>
                            {'<'}
                        </div>
                    ) : (
                        ''
                    )}

                    <div className={cls.header_title}>{t(headerTitle)}</div>

                    {isNext ? (
                        <div className={cls.header_button} onClick={nextFunc && nextFunc}>
                            {t('Next')}
                        </div>
                    ) : (
                        ''
                    )}

                    {isCancelBtn ? (
                        <div
                            className={cls.header_cancel}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            X
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                {children}
            </div>
        </CustomModal>
    )
}
