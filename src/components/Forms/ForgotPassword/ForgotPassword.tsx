import React, { useEffect, useState } from 'react'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/components/Title'
// import { Input } from '@/components/Forms/components/Input'
import { Input } from '@/shared/ui/Input/Input'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import CaptchaIcon from 'public/assets/icons/reCaotcha.svg'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

export const ForgotPassword = () => {
    // const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('forgot')
    const { router } = useRouter()
    const [forgot, setForgot] = useState<string>('')

    // useEffect(() => {
    //     enqueueSnackbar('Проверка снекбара', { variant: 'info', autoHideDuration: 2000 })
    // }, [])

    return (
        <form className={styles.form}>
            <Title title={t('Forgot')} className={styles.title} />
            <div className={styles.inputContainer} style={{ marginBottom: '54px' }}>
                <Input
                    id={'Forgot_Email'}
                    placeholder={t('Email')}
                    value={forgot}
                    onChange={(e) => {
                        setForgot(e.currentTarget.value)
                    }}
                />
                {/*<Input*/}
                {/*    type={'email'}*/}
                {/*    className={styles.input}*/}
                {/*    placeholder={'Email'}*/}
                {/*    inputBodyClass={styles.inputBody}*/}
                {/*/>*/}
                <p>{t('EnterEmail')}</p>
            </div>

            <Button className={styles.btn} theme={'primary'}>
                {t('SendLink')}
            </Button>
            <Link className={styles.link} href={'/login'}>
                {t('BackToSignUp')}
            </Link>

            <div className={styles.captcha}>
                <div className={styles.checkboxBody}>
                    <input type='checkbox' />
                    <span>{t('Robot')}</span>
                    {/*<span>I&apos;m not a robot</span>*/}
                </div>

                <CaptchaIcon />
                {/*<Image className={styles.img} src={CaptchaIcon} alt={'captcha'} />*/}
            </div>
        </form>
    )
}
