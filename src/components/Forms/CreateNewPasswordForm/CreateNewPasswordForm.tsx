import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/Title/Title'
import { Button } from '@/shared/ui/Button/Button'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNewPasswordMutation } from '@/services/AuthService'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { MessageModal } from '@/components/MessageModal/MessageModal'
import { InctagramPath } from '@/shared/api/path'
import { useErrorSnackbar } from '@/shared/hooks/useErrorSnackbar'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import clsx from 'clsx'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
// import { useTranslation } from 'next-i18next'

export const CreateNewPasswordForm = () => {
    const { t } = useTranslation('new-password')
    const router = useRouter()
    const { code } = router.query
    const [newPassword, { isSuccess, error, isError, isLoading }] = useNewPasswordMutation()
    const [open, setOpen] = useState<boolean>(false)

    const NewPasswordSchema = yup.object().shape({
        newPassword: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(20, t('Err_Yup_Max_Password')),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], t('Err_Yup_FieldMatch'))
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        },
        resolver: yupResolver(NewPasswordSchema)
    })

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log('submit recovery', data)
        data.recoveryCode = code
        const res = await newPassword(data)
        console.log('recovery response', res)
    }

    const messageModalOKHandler = () => {
        void router.push(InctagramPath.AUTH.LOGIN)
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(true)
        }
    }, [isSuccess])

    useErrorSnackbar(isError)
    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <form className={clsx(styles.form, 'authForm')} onSubmit={handleSubmit(onSubmit)}>
            <MessageModal
                open={open}
                setOpen={setOpen}
                header={t('PasswordUpdated')}
                text={t('Message')}
                buttonTitleOK={t('MainButton')}
                extraCallbackOK={messageModalOKHandler}
            />

            <Title title={t('CreateNewPassword')} className={styles.title} />

            <div className={styles.inputContainer}>
                <ControlledInput
                    password
                    id={'New_Password'}
                    name={'newPassword'}
                    type={'password'}
                    placeholder={t('Password')}
                    control={control}
                    error={errors.newPassword?.message}
                />
                <ControlledInput
                    password
                    id={'New_ConfirmPassword'}
                    name={'confirmPassword'}
                    type={'password'}
                    placeholder={t('ConfirmPassword')}
                    control={control}
                    error={errors.confirmPassword?.message}
                />
                <p>{t('PasswordLength')}</p>
            </div>

            <div style={{ marginTop: '72px' }}>
                <Button className={styles.btn} theme={'primary'} type={'submit'}>
                    {t('CreateNewPassword')}
                </Button>
            </div>
        </form>
    )
}
