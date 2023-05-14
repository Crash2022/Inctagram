import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import {Title} from '@/components/Forms/components/Title'
import {Input} from '@/shared/ui/Input/Input'
import Link from 'next/link'
import {Button} from '@/shared/ui/Button/Button'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useRegistrationMutation} from '@/services/AuthService'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {RegistrationParamsType} from '@/models/auth-types'
import {useTranslation} from 'react-i18next'
import {useSnackbar} from 'notistack'
import {useEffect} from 'react'
import {LoaderScreen} from '@/shared/ui/Loader/LoaderScreen'
import {usePush} from '@/shared/hooks/usePush'

export const RegistrationForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('registration')
    const pushHook = usePush()
    const [registration, { error, isError, isLoading, isSuccess }] = useRegistrationMutation()

    const SignUpSchema = yup.object().shape({
        userName: yup
            .string()
            .required(t('Err_Yup_Required')as string)
            .min(8, t('Err_Yup_Min')as string)
            .max(15, t('Err_Yup_Max')as string),
        email: yup
            .string()
            .required(t('Err_Yup_Required') as string)
            .email(t('Err_Yup_Email') as string)
            .min(8, t('Err_Yup_Min') as string)
            .max(15, t('Err_Yup_Max') as string),
        password: yup
            .string()
            .required(t('Err_Yup_Required') as string)
            .min(8, t('Err_Yup_Min') as string)
            .max(15, t('Err_Yup_Max') as string),
        confirmPassword: yup
            .string()
            .required(t('Err_Yup_Required') as string)
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
        try {
            await registration(data).unwrap()
            // handle success here, like a router push or a success message
        } catch (error) {
            // handle error here, like showing an error message
        }
    }

    useEffect(() => {
        if (isError) {
            enqueueSnackbar('Error', { variant: 'error', autoHideDuration: 2000 })
            pushHook('/login').then()
        }
        if (isSuccess) {
            enqueueSnackbar('Success', { variant: 'success', autoHideDuration: 2000 })
        }
    }, [isError, isSuccess, pushHook, enqueueSnackbar])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                            placeholder={t('Username') as string}
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
                            placeholder={t('Password') as string}
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
                    {t('SignIn') as string}
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
