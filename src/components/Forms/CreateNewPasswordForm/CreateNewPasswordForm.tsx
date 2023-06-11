import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import {Title} from '@/components/Forms/Title/Title'
import {Button} from '@/shared/ui/Button/Button'
import React, {useEffect, useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useTranslation} from 'next-i18next'
import {useNewPasswordMutation} from '@/services/AuthService'
import {useRouter} from 'next/router'
import {yupResolver} from '@hookform/resolvers/yup'
import {MessageModal} from '@/components/MessageModal/MessageModal'
import {InctagramPath} from '@/shared/api/path'
import {useErrorSnackbar} from '@/shared/hooks/useErrorSnackbar'
import {ControlledInput} from '@/shared/ui/Controlled/ControlledInput'
import clsx from 'clsx'
import {LoaderScreen} from '@/shared/ui/Loader/LoaderScreen'
import {FormWrapper} from '@/components/Forms/FormWrapper/FormWrapper'
import {NewPasswordSchema} from "@/shared/utils/validationSchemas";
import {handleFormErrors} from "@/shared/utils/errorHandler";
// import { useTranslation } from 'next-i18next'

export const CreateNewPasswordForm = () => {
    const { t } = useTranslation('new-password')
    const router = useRouter()
    const { code } = router.query
    const [newPassword, { isSuccess, error, isError, isLoading }] = useNewPasswordMutation()
    const [open, setOpen] = useState<boolean>(false)


    const schema = NewPasswordSchema(t)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schema)
    })
    const errorMessages = handleFormErrors(errors, t);
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
        <FormWrapper marginTop={96}>
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
                        error={errorMessages.newPassword}
                    />
                    <ControlledInput
                        password
                        id={'New_ConfirmPassword'}
                        name={'confirmPassword'}
                        type={'password'}
                        placeholder={t('ConfirmPassword')}
                        control={control}
                        error={errorMessages.confirmPassword}
                    />
                    <p>{t('PasswordLength')}</p>
                </div>

                <div style={{ marginTop: '72px' }}>
                    <Button className={styles.btn} theme={'primary'} type={'submit'}>
                        {t('CreateNewPassword')}
                    </Button>
                </div>
            </form>
        </FormWrapper>
    )
}
