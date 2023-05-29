import React from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
import { Title } from '@/components/Forms/Title/Title'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useLoginMutation, useMeQuery } from '@/services/AuthService'
import { LoginPayloadType } from '@/models/auth-types'
import { InctagramPath } from '@/shared/api/path'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

export const LoginForm = () => {
    const { t } = useTranslation('login')
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [login, { data: loginData, error, isError, isLoading }] = useLoginMutation()
    const { data: meData, isMeLoading, refetch: refetchMeData } = useMeQuery()

    const LoginSchema = yup.object().shape({
        email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email')),
        password: yup.string().required(t('Err_Yup_Required'))
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginPayloadType>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(LoginSchema)
    })

    const onSubmit: SubmitHandler<LoginPayloadType> = async (submitData: LoginPayloadType) => {
        console.log('submit login', submitData)

        try {
            const res = await login(submitData)
            console.log('login response', res)
            localStorage.setItem('accessToken', res.data.accessToken)
            await refetchMeData()
            await router.push(InctagramPath.PROFILE.PROFILE)
        } catch (error: any) {
            console.log('login error', error)
        }
    }

    useErrorSnackbar(isError)
    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <form className={clsx(styles.form, 'authForm')} onSubmit={handleSubmit(onSubmit)}>
            <Title title={t('SignIn')} className={styles.title} />

            <div className={styles.imgBody}>
                <GoogleIcon />
                <GitIcon />
            </div>

            <div className={styles.inputContainer}>
                <ControlledInput
                    id={'Login_Email'}
                    name={'email'}
                    placeholder={t('Email')}
                    control={control}
                    error={errors.email?.message}
                />
                <ControlledInput
                    id={'Login_Password'}
                    name={'password'}
                    type={'password'}
                    password
                    placeholder={t('Password')}
                    control={control}
                    error={errors.password?.message}
                />
            </div>

            <Link className={styles.forgot} href={InctagramPath.AUTH.FORGOT_PASSWORD}>
                {' '}
                {t('ForgotPassword')}
            </Link>

            <div>
                <Button className={styles.btn} theme={'primary'} type={'submit'}>
                    {t('SignIn')}
                </Button>
                <h3 className={styles.subtitle}>{t('HaveAccount')}</h3>
                <Link className={styles.link} href={InctagramPath.AUTH.REGISTRATION}>
                    {' '}
                    {t('SignUp')}
                </Link>
            </div>
        </form>
    )
}
