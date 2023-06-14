import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/Title/Title'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg' // use GitIcon instead of GithubIcon
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegistrationMutation } from '@/services/AuthService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationPayloadType } from '@/models/auth-types'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { MessageModal } from '@/components/MessageModal/MessageModal'
import { InctagramPath } from '@/shared/api/path'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import clsx from 'clsx'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { RegistrationSchema } from '@/shared/validation/registration-schema'

export const RegistrationForm = () => {
    const { t } = useTranslation('registration')

    const [open, setOpen] = useState<boolean>(false)
    const [registration, { isSuccess, error, isError, isLoading }] = useRegistrationMutation()

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<RegistrationPayloadType>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(RegistrationSchema(t))
    })

    const onSubmit: SubmitHandler<RegistrationPayloadType> = async (
        submitData: RegistrationPayloadType
    ) => {
        console.log('submit registration', submitData)

        const res = await registration(submitData)
        console.log('registration response', res)
        localStorage.setItem('email', control._getWatch('email'))
    }

    const messageModalOKHandler = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (isSuccess) setOpen(true)
    }, [isSuccess])

    useErrorSnackbar(isError)
    if (isLoading) return <LoaderScreen variant={'circle'} />

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
                <Title title={t('SignUp')} className={styles.title} />

                <div className={styles.imgBody}>
                    <GoogleIcon />
                    <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/auth/github/callback`} target="_blank" rel="noreferrer">
                        <GitIcon />
                    </a>


                </div>

                <div className={styles.inputContainer}>
                    <ControlledInput
                        id={'Reg_Username'}
                        name={'userName'}
                        placeholder={t('Username')}
                        control={control}
                        error={errors.userName?.message}
                    />
                    <ControlledInput
                        id={'Reg_Email'}
                        name={'email'}
                        placeholder={t('Email')}
                        control={control}
                        error={errors.email?.message}
                    />
                    <ControlledInput
                        password
                        id={'Reg_Password'}
                        name={'password'}
                        type={'password'}
                        placeholder={t('Password')}
                        control={control}
                        error={errors.password?.message}
                    />
                    <ControlledInput
                        password
                        id={'Reg_ConfirmPassword'}
                        name={'confirmPassword'}
                        type={'password'}
                        placeholder={t('ConfirmPassword')}
                        control={control}
                        error={errors.confirmPassword?.message}
                    />
                </div>
                <div>
                    <Button className={styles.btn} theme={'primary'} type={'submit'}>
                        {t('SignUp')}
                    </Button>
                    <h3 className={styles.subtitle}>{t('HaveAccount')}</h3>
                    <Link className={styles.link} href={InctagramPath.AUTH.LOGIN}>
                        {' '}
                        {t('SignIn')}
                    </Link>
                </div>
            </form>
        </FormWrapper>
    )
}
