import React, { useState } from 'react'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
// import { Input } from '@/shared/ui/Input/Input'
// import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
// import CaptchaIcon from 'public/assets/icons/reCaptcha.svg'
import { Title } from '@/components/Forms/Title/Title'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PasswordRecoveryType } from '@/models/auth-types'
import { InctagramPath } from '@/shared/api/path'
import { useForgotPasswordMutation } from '@/services/AuthService'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MessageModal } from '@/components/MessageModal/MessageModal'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import clsx from 'clsx'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import ReCAPTCHA from 'react-google-recaptcha'
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from '@/shared/api/recaptcha-site-key'

export const ForgotPasswordForm = () => {
    const { t } = useTranslation('forgot')
    const recaptchaRef = React.createRef()

    const [forgotPassword, { isError, isSuccess }] = useForgotPasswordMutation()

    const [open, setOpen] = useState<boolean>(false)
    const [robot, setRobot] = useState<boolean>(false)
    // const [email, setEmail] = useState<string>('')
    // const [emailError, setEmailError] = useState<string>('')

    const ForgotSchema = yup.object().shape({
        email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email')),
        recaptcha: yup.boolean().oneOf([true], t('Robot'))
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<PasswordRecoveryType>({
        defaultValues: {
            email: '',
            // recaptcha: false
            recaptcha: ''
        },
        resolver: yupResolver(ForgotSchema)
    })

    const onSubmit: SubmitHandler<PasswordRecoveryType> = async (data: PasswordRecoveryType) => {
        console.log('submit', data)
        localStorage.setItem('email', control._getWatch('email'))

        if (grecaptcha.getResponse() === '') {
            // event.preventDefault()
            setRobot(true)
            // alert("Please click <I'm not a robot> before sending the job")
        }

        // Execute the reCAPTCHA when the form is submitted
        // recaptchaRef.current.execute()

        // if (!isSuccess) {
        //     const res = await forgotPassword(data)
        //     console.log('forgot response error', res)
        //     setOpen(true)
        // }
        // if (isSuccess) {
        //     data.recaptcha = true
        //     const res = await forgotPassword(data)
        //     console.log('forgot response success', res)
        //     setOpen(true)
        // }
    }

    // const handleSubmit = (event: any) => {
    //     event.preventDefault()
    //
    //     // const trimValue = email.trim()
    //     // if (trimValue && trimValue.length < 1) {
    //     //     setEmailError(t('Err_Yup_Required'))
    //     // }
    //
    //     // if (emailError.length === 0) setEmailError(t('Err_Yup_Required'))
    //
    //     if (grecaptcha.getResponse() === '') {
    //         // event.preventDefault()
    //         setRobot(true)
    //         // alert("Please click <I'm not a robot> before sending the job")
    //     }
    //
    //     // Execute the reCAPTCHA when the form is submitted
    //     // recaptchaRef.current.execute()
    // }

    const onReCAPTCHAChange = (captchaCode: string) => {
        setRobot(false) // текст с ошибкой

        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return
        }
        // Else reCAPTCHA was executed successfully so proceed with the
        // alert(`Hey, ${email}`) // пример
        // setValue('recaptcha', captchaCode)

        // Reset the reCAPTCHA so that it can be executed again if user submits another email
        recaptchaRef.current.reset()
    }

    useErrorSnackbar(isError)

    return (
        <FormWrapper marginTop={96}>
            <form className={clsx(styles.form, 'authForm')} onSubmit={handleSubmit(onSubmit)}>
                <MessageModal
                    open={open}
                    setOpen={setOpen}
                    header={t('EmailSent')}
                    // text={t('HaveSent') + email}
                    text={t('HaveSent') + control._getWatch('email')}
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

                    {/* <Input */}
                    {/*    id={'Forgot_Email'} */}
                    {/*    name={'email'} */}
                    {/*    type={'email'} */}
                    {/*    value={email} */}
                    {/*    onChange={(e) => { */}
                    {/*        setEmail(e.currentTarget.value) */}
                    {/*    }} */}
                    {/*    placeholder={t('Email')} */}
                    {/*    // error={emailError} */}
                    {/* /> */}
                    <p>{t('EnterEmail')}</p>
                </div>

                {isSuccess ? <div>{t('SendLinkSuccess')}</div> : ''}

                <Button
                    className={styles.btn}
                    theme={'primary'}
                    type={'submit'}
                    id={'ForgotSendLinkButton'}
                >
                    {!isSuccess ? t('SendLink') : t('SendLinkAgain')}
                </Button>
                <Link className={styles.link} href={InctagramPath.AUTH.LOGIN}>
                    {t('BackToSignIn')}
                </Link>

                {!isSuccess ? (
                    <div className={styles.captcha_google}>
                        {robot ? (
                            <div className={styles.robot_message}>{t('RecaptchaRobotMessage')}</div>
                        ) : (
                            ''
                        )}
                        <div className={styles.recaptcha}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                // size='invisible'
                                size='normal'
                                // sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                // sitekey={process.env.local.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                onChange={onReCAPTCHAChange}
                            />
                        </div>
                    </div>
                ) : (
                    // <div className={styles.captcha}>
                    //      <div className={styles.checkboxBody}>
                    //         <div>
                    //             {/* <Controller */}
                    //             {/*    name='recaptcha' */}
                    //             {/*    control={control} */}
                    //             {/*    render={({ field }) => ( */}
                    //             {/*        <Checkbox {...field} error={errors.recaptcha?.message} /> */}
                    //             {/*    )} */}
                    //             {/* /> */}
                    //         </div>
                    //         <label htmlFor={'recaptcha'}>{t('Robot')}</label>
                    //      </div>
                    //      <CaptchaIcon />
                    // </div>
                    ''
                )}
            </form>
        </FormWrapper>
    )
}
