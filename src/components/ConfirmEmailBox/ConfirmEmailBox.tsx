import Image, { StaticImageData } from 'next/image'
import s from './ConfirmEmailBox.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

interface ConfirmEmailBoxType {
    title: string
    text: string
    buttonText: string
    src: StaticImageData
    merge?: boolean
    resend?: any
    email?: string
    isLoading?: boolean
    isSuccess?: boolean
}

export const ConfirmEmailBox = ({
    title,
    text,
    src,
    buttonText,
    merge,
    resend,
    email,
    isLoading,
    isSuccess
}: ConfirmEmailBoxType) => {
    const { t } = useTranslation('merge-account')
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar('Ссылка отправлена', {
                variant: 'success',
                autoHideDuration: 3000
            })
        }
    }, [isSuccess])

    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <div className={s.container}>
            <h1 className={s.title}>{title}</h1>
            <p>{text}</p>
            {merge && (
                <>
                    <Button className={s.button} theme={'outline'}>
                        {t('Yes')}
                    </Button>
                    <Button className={s.button} theme={'outline'}>
                        {t('No')}
                    </Button>
                </>
            )}
            {!merge && (
                <Button
                    className={s.button}
                    theme={'primary'}
                    onClick={() => {
                        resend(email)
                        // localStorage.removeItem('email')
                    }}
                >
                    {buttonText}
                </Button>
                // <ButtonLink
                //     className={s.button}
                //     theme={'primary'}
                //     href={InctagramPath.AUTH.LOGIN}
                //     title={buttonText}
                // />
            )}
            <Image src={src} alt={'success-image'} />
        </div>
    )
}
