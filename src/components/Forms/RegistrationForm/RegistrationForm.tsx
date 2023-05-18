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
import { RegistrationPayloadType } from '@/models/auth-types'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MessageModal } from '@/features/MessageModal/MessageModal'
import { InctagramPath } from '@/shared/api/path'

export const RegistrationForm = () => {
    const { t } = useTranslation('registration')
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [registration, { isSuccess, error, isError, isLoading }] = useRegistrationMutation()

    const SignUpSchema = yup.object().shape({
        userName: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(30, t('Err_Yup_Max')),
        email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email')),
        password: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(20, t('Err_Yup_Max')),
        confirmPassword: yup
            .string()
            .required(t('Err_Yup_Required'))
            .oneOf([yup.ref('password'), null], t('Err_Yup_FieldMatch'))
    })

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
        resolver: yupResolver(SignUpSchema)
    })

    const onSubmit: SubmitHandler<RegistrationPayloadType> = async (
        submitData: RegistrationPayloadType
    ) => {
        console.log('submit registration', submitData)
        await registration(submitData).then((res) => console.log(res))
    }

    const messageModalOKHandler = () => {
        router.push('/auth/login').then()
    }

    useEffect(() => {
        if (isSuccess) setOpen(true)
        if (isError)
            enqueueSnackbar(/*error.data.messages[0].message*/ 'Ошибка сервера', {
                variant: 'error',
                autoHideDuration: 3000
            })
    }, [isSuccess, isError])

    if (isLoading) return <LoaderScreen variant={'loader'} />

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                <Link className={styles.link} href={InctagramPath.AUTH.LOGIN}>
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
