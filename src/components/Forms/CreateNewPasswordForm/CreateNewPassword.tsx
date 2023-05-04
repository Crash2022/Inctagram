import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/components/Title'
import Image from 'next/image'
import { Input } from '@/components/Forms/components/Input'
import { Button } from '@/shared/ui/Button/Button'
import eye from 'public/assets/icons/eye.svg'
import eyeOff from 'public/assets/icons/eye-off.svg'
import React, { useState } from 'react'

export const CreateNewPasswordForm = () => {
    const [isPassword, setIsPassword] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)

    const lockPasswordHandler = () => {
        setIsPassword(!isPassword)
    }

    const lockConfirmHandler = () => {
        setIsConfirm(!isConfirm)
    }

    return (
        <form className={styles.form}>
            <Title title={'Create New Password'} className={styles.title} />

            <div className={styles.inputContainer}>
                <Input
                    type={isPassword ? 'text' : 'password'}
                    inputBodyClass={styles.inputBody}
                    className={styles.input}
                    placeholder={'New password'}
                >
                    <Image
                        className={styles.img}
                        src={isPassword ? eyeOff : eye}
                        onClick={lockPasswordHandler}
                        alt={''}
                    />
                </Input>
                <Input
                    type={isConfirm ? 'text' : 'password'}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                    placeholder={'Password confirmation'}
                >
                    <Image
                        className={styles.img}
                        src={isConfirm ? eyeOff : eye}
                        onClick={lockConfirmHandler}
                        alt={''}
                    />

                    <p>Your password must be between 6 and 20 characters</p>
                </Input>
            </div>

            <div style={{ marginTop: '72px' }}>
                <Button className={styles.btn} theme={'primary'}>
                    Create new password
                </Button>
            </div>
        </form>
    )
}
