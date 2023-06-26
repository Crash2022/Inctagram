import React, { useRef, useState } from 'react'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/Title/Title'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PasswordRecoveryType } from '@/shared/types/auth-types'
import { InctagramPath } from '@/shared/api/path'
import { useForgotPasswordMutation } from '@/services/AuthService'
import { yupResolver } from '@hookform/resolvers/yup'
import { MessageModal } from '@/components/MessageModal/MessageModal'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import clsx from 'clsx'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import ReCAPTCHA from 'react-google-recaptcha'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { ForgotSchema } from '@/shared/validation/forgot-schema'
// import CaptchaIcon from 'public/assets/icons/reCaptcha.svg'

export const ForgotPasswordForm = () => {
    const { t } = useTranslation('forgot')
    const recaptchaRef = useRef<ReCAPTCHA | null>(null)

    const [forgotPassword, { isError, isSuccess, isLoading }] = useForgotPasswordMutation()

    const [open, setOpen] = useState<boolean>(false)
    const [isRobot, setIsRobot] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<PasswordRecoveryType>({
        defaultValues: {
            email: '',
            recaptcha: ''
        },
        resolver: yupResolver(ForgotSchema(t))
    })

    const onSubmit: SubmitHandler<PasswordRecoveryType> = async (data: PasswordRecoveryType) => {
        console.log('submit forgot', data)
        localStorage.setItem('email', control._getWatch('email'))

        if (recaptchaRef.current?.getValue()) {
            // console.log('submit recaptcha', control._getWatch('recaptcha'))
            const forgotResponse = await forgotPassword(data)
            console.log('forgot response', forgotResponse)
            setOpen(true)
        } else {
            setIsRobot(true)
        }
    }

    const onReCAPTCHAChange = () => {
        // return (captchaCode: string)
        // console.log('captchaCode in recaptchaRef', recaptchaRef.current.getValue())

        if (recaptchaRef.current?.getValue()) {
            setValue('recaptcha', recaptchaRef.current?.getValue() ?? "")
            setIsRobot(false)
            // console.log('onChange recaptcha hook form value', control._getWatch('recaptcha'))
        }
    }

    useErrorSnackbar(isError)
    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <FormWrapper marginTop={96}>
            <form className={clsx(styles.form, 'authForm')} onSubmit={handleSubmit(onSubmit)}>
                <MessageModal
                    open={open}
                    setOpen={setOpen}
                    header={t('EmailSent')}
                    text={`${t('HaveSent')}${control._getWatch('email') ?? ""}`}
                    buttonTitleOK={t('MainButton')}
                    extraCallbackOK={() => {
                        setOpen(false)
                    }}
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
                    id={'ForgotSendLinkButton'}
                    className={styles.btn}
                    theme={'primary'}
                    type={'submit'}
                >
                    {!isSuccess ? t('SendLink') : t('SendLinkAgain')}
                </Button>
                <Link className={styles.link} href={InctagramPath.AUTH.LOGIN}>
                    {t('BackToSignIn')}
                </Link>

                <div className={styles.captcha_google}>
                    {isRobot ? (
                        <div className={styles.robot_message}>{t('RecaptchaRobotMessage')}</div>
                    ) : (
                        ''
                    )}
                    <div className={styles.recaptcha}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size='normal'
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
                            onChange={onReCAPTCHAChange}
                        />
                    </div>
                </div>

                {/* {!isSuccess ? ( */}
                {/*    <div className={styles.captcha_google}> */}
                {/*        {robot ? ( */}
                {/*            <div className={styles.robot_message}>{t('RecaptchaRobotMessage')}</div> */}
                {/*        ) : ( */}
                {/*            '' */}
                {/*        )} */}
                {/*        <div className={styles.recaptcha}> */}
                {/*            <ReCAPTCHA */}
                {/*                ref={recaptchaRef} */}
                {/*                // size='invisible' */}
                {/*                size='normal' */}
                {/*                // sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} */}
                {/*                // sitekey={process.env.local.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} */}
                {/*                sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY} */}
                {/*                onChange={onReCAPTCHAChange} */}
                {/*            /> */}
                {/*        </div> */}
                {/*    </div> */}
                {/* ) : ( */}
                {/*    // <div className={styles.captcha}> */}
                {/*    //      <div className={styles.checkboxBody}> */}
                {/*    //         <div> */}
                {/*    //             /!* <Controller *!/ */}
                {/*    //             /!*    name='recaptcha' *!/ */}
                {/*    //             /!*    control={control} *!/ */}
                {/*    //             /!*    render={({ field }) => ( *!/ */}
                {/*    //             /!*        <Checkbox {...field} error={errors.recaptcha?.message} /> *!/ */}
                {/*    //             /!*    )} *!/ */}
                {/*    //             /!* /> *!/ */}
                {/*    //         </div> */}
                {/*    //         <label htmlFor={'recaptcha'}>{t('Robot')}</label> */}
                {/*    //      </div> */}
                {/*    //      <CaptchaIcon /> */}
                {/*    // </div> */}
                {/*    '' */}
                {/* )} */}
            </form>
        </FormWrapper>
    )
}
