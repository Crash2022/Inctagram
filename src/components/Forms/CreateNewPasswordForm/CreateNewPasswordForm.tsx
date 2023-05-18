import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/Title/Title'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNewPasswordMutation } from '@/services/AuthService'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { MessageModal } from '@/features/MessageModal/MessageModal'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { useSnackbar } from 'notistack'
import { InctagramPath } from '@/shared/api/path'
// import { useTranslation } from 'next-i18next'

export const CreateNewPasswordForm = () => {
    const { t } = useTranslation('new-password')
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const { code } = router.query
    const [newPassword, { isSuccess, error, isError, isLoading }] = useNewPasswordMutation()
    const [open, setOpen] = useState<boolean>(false)

    const NewPasswordSchema = yup.object().shape({
        newPassword: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(20, t('Err_Yup_Max')),
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
        console.log('submit', data)
        data.recoveryCode = code
        await newPassword(data).then((res) => {
            console.log(res)
        })
    }

    const messageModalOKHandler = () => {
        router.push(InctagramPath.AUTH.LOGIN).then()
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(true)
        }
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
                header={t('PasswordUpdated')}
                text={t('Message')}
                buttonTitleOK={t('MainButton')}
                extraCallbackOK={messageModalOKHandler}
            />

            <Title title={t('CreateNewPassword')} className={styles.title} />

            <div className={styles.inputContainer}>
                <Controller
                    name='newPassword'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={'New_Password'}
                            placeholder={t('Password')}
                            password
                            error={errors.newPassword?.message}
                        />
                    )}
                />
                <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={'New_ConfirmPassword'}
                            placeholder={t('ConfirmPassword')}
                            password
                            error={errors.confirmPassword?.message}
                        />
                    )}
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
