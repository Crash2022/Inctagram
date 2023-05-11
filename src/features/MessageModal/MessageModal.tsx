import React from 'react'
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
    extraButton?: boolean // модалка с двумя кнопками (+ нужен extraCallbackYES)
    extraCallbackYES?: () => void // функция для модалки с двумя кнопками
    buttonTitleOK: string // название кнопки для модалки с одной кнопкой
    extraCallbackOK?: () => void
    longButton?: boolean // одна кнопка на всю ширину (только стили)
}

export const MessageModal = (props: MessageModalProps) => {
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
                                        if (props.extraCallbackYES) {
                                            props.extraCallbackYES()
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
                                    if (props.extraCallbackOK) {
                                        props.extraCallbackOK()
                                    }
                                }}
                            >
                                {props.buttonTitleOK}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </CustomModal>
    )
}
