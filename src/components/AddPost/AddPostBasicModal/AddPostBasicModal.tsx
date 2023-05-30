import React, { ReactElement } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import cls from './AddPostBasicModal.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button'

interface AddPostBasicModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    children: ReactElement
    headerTitle: string
    isPrevious?: boolean
    isNext?: boolean
    isNextForUpload?: boolean
    isPhotoUploaded?: boolean
    isCancelBtn?: boolean
    prevFunc?: () => void
    nextFunc?: () => void
    modalWidth?: string
}

export const AddPostBasicModal = ({
    open,
    setOpen,
    children,
    headerTitle,
    isPrevious,
    isNext,
    isNextForUpload,
    isPhotoUploaded,
    isCancelBtn,
    prevFunc,
    nextFunc,
    modalWidth
}: AddPostBasicModalProps) => {
    const { t } = useTranslation('add-post-modal')

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div
                className={cls.addPostModal_mainBox}
                style={{ width: modalWidth ? `${modalWidth}px` : '' }}
            >
                <div className={cls.addPostModal_header}>
                    {isPrevious ? (
                        <div className={cls.header_button} onClick={prevFunc && prevFunc}>
                            {'<'}
                        </div>
                    ) : (
                        ''
                    )}

                    <div className={cls.header_title}>{t(headerTitle)}</div>

                    {isNextForUpload ? (
                        <Button
                            className={cls.header_button}
                            theme={'clear'}
                            onClick={nextFunc && nextFunc}
                            disabled={!isPhotoUploaded}
                        >
                            {t('Next')}
                        </Button>
                    ) : (
                        ''
                    )}

                    {isNext ? (
                        <Button
                            className={cls.header_button}
                            theme={'clear'}
                            onClick={nextFunc && nextFunc}
                        >
                            {t('Next')}
                        </Button>
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
