import React from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
import { Title } from '@/components/Forms/Title/Title'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useLoginMutation, useMeQuery } from '@/services/AuthService'
import { LoginPayloadType } from '@/shared/types/auth-types'
import { InctagramPath } from '@/shared/api/path'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { FormWrapper } from '@/components/Forms/FormWrapper/FormWrapper'
import { LoginSchema } from '@/shared/validation/login-schema'

export const LoginForm = () => {
    const { t } = useTranslation('login')
    const router = useRouter()

    const [login, { data: loginData, isError, isLoading }] = useLoginMutation()
    const { data: meData, refetch: refetchMeData } = useMeQuery({})

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginPayloadType>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(LoginSchema(t))
    })

    const onSubmit: SubmitHandler<LoginPayloadType> = async (submitData: LoginPayloadType) => {
        console.log('submit login', submitData)

        try {
            const res = await login(submitData)
            console.log('login response', res)

            if ('data' in res) {
                localStorage.setItem('accessToken', res.data.accessToken)
                await refetchMeData()
                await router.push(InctagramPath.PROFILE.PROFILE)
            } else {
                console.log('No data in response');
            }
        } catch (error: any) {
            console.log('login error', error)
        }
    }

    useErrorSnackbar(isError)
    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <FormWrapper marginTop={96}>
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
        </FormWrapper>
    )
}
