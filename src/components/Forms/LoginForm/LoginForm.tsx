import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
import { Title } from '@/components/Forms/components/Title'
// import { Input } from '@/components/Forms/components/Input'
import { Input } from '@/shared/ui/Input/Input'
import EyeIcon from 'public/assets/icons/eye.svg'
import EyeOffIcon from 'public/assets/icons/eye-off.svg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationParamsType } from '@/models/auth-types'
import { useRegistrationMutation } from '@/services/AuthService'
import { useRouter } from 'next/router'

export const LoginForm = () => {
    const { t } = useTranslation('login')
    const { router } = useRouter()
    // const [login, { onSuccess, error, isLoading }] = useRegistrationMutation()
    // const [isLock, setIsLock] = useState(false)
    //
    // const lockHandler = () => {
    //     setIsLock(!isLock)
    // }

    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log('submit', data)
        // await login(data).then((res) => console.log(res))
    }

    return (
        <form className={styles.form}>
            <Title title={t('SignIn')} className={styles.title} />

            <div className={styles.imgBody}>
                <GoogleIcon />
                <GitIcon />
            </div>

            <div className={styles.inputContainer}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => <Input {...field} placeholder={t('Email')} />}
                />
                {/*<Input*/}
                {/*    // type={'email'}*/}
                {/*    placeholder={'Email'}*/}
                {/*    // className={styles.input}*/}
                {/*    // inputBodyClass={styles.inputBody}*/}
                {/*/>*/}

                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder={t('Password')} password />
                    )}
                />
                {/*<Input*/}
                {/*    // type={isLock ? 'text' : 'password'}*/}
                {/*    placeholder={'Password'}*/}
                {/*    // className={styles.input}*/}
                {/*    // inputBodyClass={styles.inputBody}*/}
                {/*/>*/}
                {/*    {isLock ? (*/}
                {/*        <EyeOffIcon onClick={lockHandler} />*/}
                {/*    ) : (*/}
                {/*        <EyeIcon onClick={lockHandler} />*/}
                {/*    )}*/}
                {/*</Input>*/}
            </div>

            <Link className={styles.forgot} href={'/forgot-password'}>
                {' '}
                {t('ForgotPassword')}
            </Link>

            <div>
                <Button className={styles.btn} theme={'primary'}>
                    {t('SignUp')}
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
