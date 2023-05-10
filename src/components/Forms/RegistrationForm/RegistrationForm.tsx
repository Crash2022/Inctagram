import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/components/Title'
import { Input } from '@/shared/ui/Input/Input'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRegistrationMutation } from '@/services/AuthService'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { RegistrationParamsType } from '@/models/auth-types'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { usePush } from '@/shared/hooks/usePush'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MessageModal } from '@/features/MessageModal/MessageModal'

export const RegistrationForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('registration')
    const pushHook = usePush()
    const [open, setOpen] = useState<boolean>(false)
    const [registration, { onSuccess, error, isError, isLoading }] = useRegistrationMutation()

    const SignUpSchema = yup.object().shape({
        userName: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(8, t('Err_Yup_Min'))
            .max(50, t('Err_Yup_Max')),
        email: yup
            .string()
            .required(t('Err_Yup_Required'))
            .email(t('Err_Yup_Email'))
            .min(8, t('Err_Yup_Min'))
            .max(50, t('Err_Yup_Max')),
        password: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(8, t('Err_Yup_Min'))
            .max(15, t('Err_Yup_Max')),
        confirmPassword: yup
            .string()
            .required(t('Err_Yup_Required'))
            .oneOf([yup.ref('password'), null], t('Err_Yup_FieldMatch'))
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<RegistrationParamsType>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(SignUpSchema)
    })

    const onSubmit: SubmitHandler<RegistrationParamsType> = async (
        data: RegistrationParamsType
    ) => {
        console.log('submit', data)
        setOpen(true)
        // await registration(data).then((res) => console.log(res))
    }

    useEffect(() => {
        if (error) {
            pushHook('/login').then()
        }
        // error && enqueueSnackbar('Ошибка', { variant: 'error', autoHideDuration: 2000 })
    }, [error, pushHook])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <MessageModal
                open={open}
                setOpen={setOpen}
                header={t('EmailSent')}
                text={t('HaveSent') + control._getWatch('email')}
            />
            <Title title={t('SignUp')} className={styles.title} />

            <div className={styles.imgBody}>
                <GoogleIcon />
                <GitIcon />
            </div>

            <div className={styles.inputContainer}>
                <Controller
                    name='userName'
                    control={control}
                    render={({ field }: any) => (
                        <Input
                            {...field}
                            id={'Reg_Username'}
                            placeholder={t('Username')}
                            error={errors.userName?.message}
                        />
                    )}
                />
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={'Reg_Email'}
                            placeholder={t('Email')}
                            error={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={'Reg_Password'}
                            placeholder={t('Password')}
                            error={errors.password?.message}
                            password
                        />
                    )}
                />
                <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={'Reg_ConfirmPassword'}
                            placeholder={t('ConfirmPassword')}
                            error={errors.confirmPassword?.message}
                            password
                        />
                    )}
                />
            </div>
            <div>
                <Button className={styles.btn} theme={'primary'} type={'submit'}>
                    {t('SignUp')}
                </Button>
                <h3 className={styles.subtitle}>{t('HaveAccount')}</h3>
                <Link className={styles.link} href={'/login'}>
                    {' '}
                    {t('SignIn')}
                </Link>
            </div>
        </form>
    )
}

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['header', 'registration']))
//         }
//     }
// }
