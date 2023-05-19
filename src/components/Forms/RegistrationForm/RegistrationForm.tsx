import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/Title/Title'
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
import { useEffect, useState } from 'react'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MessageModal } from '@/components/MessageModal/MessageModal'
import { InctagramPath } from '@/shared/api/path'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'

export const RegistrationForm = () => {
    const { t } = useTranslation('registration')

    const [open, setOpen] = useState<boolean>(false)
    const [registration, { isSuccess, error, isError, isLoading }] = useRegistrationMutation()

    const SignUpSchema = yup.object().shape({
        userName: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(30, t('Err_Yup_Max_Name')),
        email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email')),
        password: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(20, t('Err_Yup_Max_Password')),
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
        setOpen(false)
    }

    useErrorSnackbar(isError)

    useEffect(() => {
        if (isSuccess) setOpen(true)
    }, [isSuccess])

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
                    id={'Reg_Password'}
                    name={'password'}
                    password
                    placeholder={t('Password')}
                    control={control}
                    error={errors.password?.message}
                />
                <ControlledInput
                    id={'Reg_ConfirmPassword'}
                    name={'confirmPassword'}
                    password
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
    )
}

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['header', 'registration']))
//         }
//     }
// }
