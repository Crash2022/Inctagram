import React, { useState } from 'react'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/Title/Title'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import CaptchaIcon from 'public/assets/icons/reCaptcha.svg'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PasswordRecoveryType } from '@/models/auth-types'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { InctagramPath } from '@/shared/api/path'
import { useForgotPasswordMutation } from '@/services/AuthService'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MessageModal } from '@/components/MessageModal/MessageModal'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import clsx from 'clsx'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'

export const ForgotPasswordForm = () => {
    const { t } = useTranslation('forgot')
    const [open, setOpen] = useState<boolean>(false)
    const [forgotPassword, { error, isError, isSuccess }] = useForgotPasswordMutation()

    const ForgotSchema = yup.object().shape({
        email: yup.string().required(t('Err_Yup_Required')),
        recaptcha: yup.boolean().oneOf([true], t('Robot'))
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<PasswordRecoveryType>({
        defaultValues: {
            email: '',
            recaptcha: false
        },
        resolver: yupResolver(ForgotSchema)
    })

    // sitekey="6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ"

    const onSubmit: SubmitHandler<PasswordRecoveryType> = async (data: PasswordRecoveryType) => {
        // grecaptcha.ready(function() {
        //     grecaptcha.execute('6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ', {action: 'submit'}).then(function(token) {
        //         // Add your logic to submit to your backend server here
        //
        //         console.log('submit', data)
        //         localStorage.setItem('email', control._getWatch('email'))
        //         if (!isSuccess) {
        //             const res = await forgotPassword(data)
        //             console.log('forgot response error', res)
        //             setOpen(true)
        //         }
        //         if (isSuccess) {
        //             data.recaptcha = true
        //             const res = await forgotPassword(data)
        //             console.log('forgot response success', res)
        //             setOpen(true)
        //         }
        //     })
        // })

        console.log('submit', data)
        localStorage.setItem('email', control._getWatch('email'))
        if (!isSuccess) {
            const res = await forgotPassword(data)
            console.log('forgot response error', res)
            setOpen(true)
        }
        if (isSuccess) {
            data.recaptcha = true
            const res = await forgotPassword(data)
            console.log('forgot response success', res)
            setOpen(true)
        }
    }

    const messageModalOKHandler = () => {
        setOpen(false)
    }

    useErrorSnackbar(isError)

    return (
        <FormWrapper marginTop={96}>
            <form className={clsx(styles.form, 'authForm')} onSubmit={handleSubmit(onSubmit)}>
                <MessageModal
                    open={open}
                    setOpen={setOpen}
                    header={t('EmailSent')}
                    text={t('HaveSent') + control._getWatch('email')}
                    buttonTitleOK={t('MainButton')}
                    extraCallbackOK={messageModalOKHandler}
                />

                <Title title={t('Forgot')} className={styles.title} />
                <div className={styles.inputContainer} style={{ marginBottom: '54px' }}>
                    <ControlledInput
                        id={'Forgot_Email'}
                        name={'email'}
                        placeholder={t('Email')}
                        control={control}
                        error={errors.email?.message}
                    />
                    <p>{t('EnterEmail')}</p>
                </div>

                {isSuccess ? <div>{t('SendLinkSuccess')}</div> : ''}

                <Button
                    className={styles.btn}
                    theme={'primary'}
                    type={'submit'}
                    id={'ForgotSendLinkButton'}
                    // data-sitekey={'6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'}
                >
                    {!isSuccess ? t('SendLink') : t('SendLinkAgain')}
                </Button>
                <Link className={styles.link} href={InctagramPath.AUTH.LOGIN}>
                    {t('BackToSignIn')}
                </Link>

                {!isSuccess ? (
                    <div className={styles.captcha}>
                        <div className={styles.checkboxBody}>
                            <div>
                                <Controller
                                    name='recaptcha'
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} error={errors.recaptcha?.message} />
                                    )}
                                />
                            </div>
                            <label htmlFor={'recaptcha'}>{t('Robot')}</label>
                        </div>

                        <CaptchaIcon />
                    </div>
                ) : (
                    ''
                )}
            </form>
        </FormWrapper>
    )
}
