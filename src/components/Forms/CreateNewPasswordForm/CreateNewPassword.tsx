import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/components/Title'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'

export const CreateNewPasswordForm = () => {
    const { t } = useTranslation('new-password')

    // const [isPassword, setIsPassword] = useState(false)
    // const [isConfirm, setIsConfirm] = useState(false)
    //
    // const lockPasswordHandler = () => {
    //     setIsPassword(!isPassword)
    // }
    //
    // const lockConfirmHandler = () => {
    //     setIsConfirm(!isConfirm)
    // }

    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log('submit', data)
        // await registration(data).then((res) => console.log(res))
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Title title={t('CreateNewPassword')} className={styles.title} />

            <div className={styles.inputContainer}>
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={'New_Password'}
                            placeholder={t('Password') as string}
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
                            id={'New_ConfirmPassword'}
                            placeholder={t('ConfirmPassword') as string}
                            password
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
