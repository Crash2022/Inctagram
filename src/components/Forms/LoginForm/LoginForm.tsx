import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
import { Title } from '@/components/Forms/components/Title'
import { Input } from '@/shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useLoginMutation, useMeQuery } from '@/services/AuthService'
import { LoginPayloadType, MeResponseType } from '@/models/auth-types'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'

export const LoginForm = () => {
    const { t } = useTranslation('login')
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [login, { data: loginData, isSuccess, error, isError, isLoading }] = useLoginMutation()
    const { data: me } = useMeQuery()

    console.log(me)

    const { control, handleSubmit } = useForm<LoginPayloadType>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<LoginPayloadType> = async (submitData: LoginPayloadType) => {
        console.log('submit login', submitData)
        await login(submitData).then((res) => {
            console.log(res)
            localStorage.setItem('accessToken', res.data.accessToken)

            me.then((res: MeResponseType) => {
                console.log(res)
                localStorage.setItem('userId', res.userId.toString())
                localStorage.setItem('userName', res.userName)
                localStorage.setItem('email', res.email)
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    useEffect(() => {
        if (isSuccess) router.push('/profile').then()
        if (isError)
            enqueueSnackbar(/*error.data.messages[0].message*/ 'Ошибка сервера', {
                variant: 'error',
                autoHideDuration: 3000
            })
    }, [isSuccess, isError])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Title title={t('SignIn')} className={styles.title} />

            <div className={styles.imgBody}>
                <GoogleIcon />
                <GitIcon />
            </div>

            <div className={styles.inputContainer}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <Input {...field} id={'Login_Email'} placeholder={t('Email')} />
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={'Login_Password'}
                            placeholder={t('Password')}
                            password
                        />
                    )}
                />
            </div>

            <Link className={styles.forgot} href={'/forgot-password'}>
                {' '}
                {t('ForgotPassword')}
            </Link>

            <div>
                <Button className={styles.btn} theme={'primary'} type={'submit'}>
                    {t('SignIn')}
                </Button>
                <h3 className={styles.subtitle}>{t('HaveAccount')}</h3>
                <Link className={styles.link} href={'/registration'}>
                    {' '}
                    {t('SignUp')}
                </Link>
            </div>
        </form>
    )
}
