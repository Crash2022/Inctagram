import React, { useEffect, useState } from 'react'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/components/Title'
import { Input } from '@/shared/ui/Input/Input'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import CaptchaIcon from 'public/assets/icons/reCaotcha.svg'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PasswordRecoveryType } from '@/models/auth-types'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { InctagramPath } from '@/shared/api/path'
import { useForgotPasswordMutation } from '@/services/AuthService'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

export const ForgotPasswordForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('forgot')
    const router = useRouter()
    const [forgotPassword, { isSuccess, error, isError, isLoading }] = useForgotPasswordMutation()

    const { control, handleSubmit } = useForm<PasswordRecoveryType>({
        defaultValues: {
            email: '',
            recaptcha: false
        }
    })

    const onSubmit: SubmitHandler<PasswordRecoveryType> = async (data: PasswordRecoveryType) => {
        console.log('submit', data)
        localStorage.setItem('email', control._getWatch('email'))
        await forgotPassword(data).then((res) => console.log(res))
    }

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar(/*error.data.messages[0].message*/ 'Письмо отправлено', {
                variant: 'success',
                autoHideDuration: 3000
            })
        }
        if (isError)
            enqueueSnackbar(/*error.data.messages[0].message*/ 'Ошибка сервера', {
                variant: 'error',
                autoHideDuration: 3000
            })
    }, [isSuccess, isError])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Title title={t('Forgot')} className={styles.title} />
            <div className={styles.inputContainer} style={{ marginBottom: '54px' }}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <Input {...field} id={'Forgot_Email'} placeholder={t('Email')} />
                    )}
                />
                <p>{t('EnterEmail')}</p>
            </div>

            <Button className={styles.btn} theme={'primary'} type={'submit'}>
                {t('SendLink')}
            </Button>
            <Link className={styles.link} href={InctagramPath.AUTH.LOGIN}>
                {t('BackToSignIn')}
            </Link>

            <div className={styles.captcha}>
                <div className={styles.checkboxBody}>
                    <div>
                        <Controller
                            name='recaptcha'
                            control={control}
                            render={({ field }) => <Checkbox {...field} />}
                        />
                    </div>
                    <div>{t('Robot')}</div>
                    {/*<span>I&apos;m not a robot</span>*/}
                </div>

                <CaptchaIcon />
            </div>
        </form>
    )
}
