import Image, { StaticImageData } from 'next/image'
import s from './ConfirmEmailBox.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useRegistrationConfirmationMutation } from '@/services/AuthService'
import { useEffect } from 'react'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink'

interface ConfirmEmailBoxType {
    title: string
    text: string
    buttonText: string
    src: StaticImageData
    merge?: boolean
}

export const ConfirmEmailBox = ({ title, text, src, buttonText, merge }: ConfirmEmailBoxType) => {
    const { t } = useTranslation('mergeAccount')
    const router = useRouter()
    const { code } = router.query

    const [registrationConfirmation, { isSuccess, error, isError, isLoading }] =
        useRegistrationConfirmationMutation()

    // useEffect(() => {
    //     registrationConfirmation({ confirmationCode: code }).then((res) => {
    //         console.log('code', code)
    //         console.log('response', res)
    //     })
    // }, [])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    const sendCode = () => {
        return registrationConfirmation({ confirmationCode: code }).then((res) => {
            console.log('code', code)
            console.log('response', res)
        })
    }

    return (
        <div className={s.container}>
            {/*{sendCode()}*/}
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
                // <Button
                //     className={s.button}
                //     theme={'primary'}
                //     onClick={() => {
                //         router.push('/auth/login').then()
                //     }}
                // >
                //     {buttonText}
                // </Button>
                <ButtonLink
                    className={s.button}
                    theme={'primary'}
                    href={'/auth/login'}
                    title={buttonText}
                />
            )}
            <Image src={src} alt={''} />
        </div>
    )
}
