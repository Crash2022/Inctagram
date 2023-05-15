import Image, { StaticImageData } from 'next/image'
import s from './ConfirmEmailBox.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { usePush } from '@/shared/hooks/usePush'
import { useRegistrationConfirmationMutation } from '@/services/AuthService'
import { useEffect } from 'react'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

interface ConfirmEmailBoxType {
    title: string
    text: string
    buttonText: string
    src: StaticImageData
    merge?: boolean
}

export const ConfirmEmailBox = ({ title, text, src, buttonText, merge }: ConfirmEmailBoxType) => {
    const { t } = useTranslation('mergeAccount')
    const pushHook = usePush()
    const router = useRouter()
    const { code } = router.query

    const [registrationConfirmation, { isSuccess, error, isError, isLoading }] =
        useRegistrationConfirmationMutation()

    useEffect(() => {
        registrationConfirmation({ confirmationCode: code }).then((res) => {
            console.log(code)
            console.log(res)
        })
    }, [])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <div className={s.container}>
            <h1>{title}</h1>
            <p>{text}</p>
            {merge && (
                <>
                    <Button className={s.button} theme={'outline'}>
                        {t('yes')}
                    </Button>
                    <Button className={s.button} theme={'outline'}>
                        No
                    </Button>
                </>
            )}
            {!merge && (
                <Button
                    className={s.button}
                    theme={'primary'}
                    onClick={() => {
                        // pushHook('/auth/login').then()
                        router.push('/auth/login').then()
                    }}
                >
                    {buttonText}
                </Button>
            )}
            <Image src={src} alt={''} />
        </div>
    )
}
