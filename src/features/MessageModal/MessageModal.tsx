import React, { useState } from 'react'
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
import s from './MessageModal.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

interface MessageModalProps {
    open: boolean
    setOpen: (value: boolean) => void
    header: string
    text: string
    extraButton?: boolean
    extraCallback?: () => void
    longButton?: boolean
}

export const MessageModal = (props: MessageModalProps) => {
    // const [open, setOpen] = useState<boolean>(false)
    const { t } = useTranslation('message-modal')

    return (
        <CustomModal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
        >
            <div className={s.messageModal_mainBox}>
                <div className={s.messageModal_header}>
                    <div>{props.header}</div>
                    <div
                        className={s.header_cancel}
                        onClick={() => {
                            props.setOpen(false)
                        }}
                    >
                        X
                    </div>
                </div>
                <div className={s.messageModal_title}>{props.text}</div>
                <div
                    className={clsx({
                        [s.messageModal_buttons]: !props.longButton,
                        [s.messageModal_longButton]: props.longButton
                    })}
                >
                    {props.extraButton ? (
                        <>
                            <div>
                                <Button
                                    theme={'outline'}
                                    onClick={() => {
                                        if (props.extraCallback) {
                                            props.extraCallback()
                                        }
                                    }}
                                >
                                    {t('Yes')}
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        props.setOpen(false)
                                    }}
                                >
                                    {t('No')}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div>
                            <Button
                                onClick={() => {
                                    props.setOpen(false)
                                }}
                            >
                                ОК
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </CustomModal>
    )
}
