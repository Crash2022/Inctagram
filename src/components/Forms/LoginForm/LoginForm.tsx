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
import { useLoginMutation } from '@/services/AuthService'
import { LoginParamsType } from '@/models/auth-types'

export const LoginForm = () => {
    const { t } = useTranslation('login')
    const { router } = useRouter()
    const [login, { onSuccess, error, isLoading }] = useLoginMutation()

    const { control, handleSubmit } = useForm<LoginParamsType>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<LoginParamsType> = async (data: LoginParamsType) => {
        console.log('submit', data)
        await login(data).then((res) => console.log(res))
    }

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
                {/*<h3 className={styles.subtitle}>Don&apos;t have an account?</h3>*/}
                <Link className={styles.link} href={'/registration'}>
                    {' '}
                    {t('SignUp')}
                </Link>
            </div>
        </form>
    )
}
