import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/components/Title'
import Image from 'next/image'
import { Input } from '@/components/Forms/components/Input'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
import eye from 'public/assets/icons/eye.svg'
import eyeOff from 'public/assets/icons/eye-off.svg'
import { useState } from 'react'
import { authAPI, useAuthQuery } from '@/services/AuthService'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { RegistrationParamsType } from '@/models/auth-types'

export const RegistrationForm = () => {
    // const { isLoading, error, isError } = useAuthQuery()
    // const [registration, {}] = authAPI.useRegistrationMutation()

    // const [userName, setUserName] = useState<string>('')
    // const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    // const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [isPassword, setIsPassword] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)

    const lockPasswordHandler = () => {
        setIsPassword(!isPassword)
    }

    const lockConfirmHandler = () => {
        setIsConfirm(!isConfirm)
    }

    const { control, handleSubmit } = useForm<any>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<any> = (data: RegistrationParamsType) => {
        console.log('submit', data)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Title title={'Sign Up'} className={styles.title} />

            <div className={styles.imgBody}>
                <GoogleIcon />
                <GitIcon />
            </div>

            <div className={styles.inputContainer}>
                {/*<Controller*/}
                {/*    name='userName'*/}
                {/*    control={control}*/}
                {/*    render={({ field }) => (*/}
                {/*        <Input*/}
                {/*            {...field}*/}
                {/*            type={'text'}*/}
                {/*            placeholder={'Username'}*/}
                {/*            className={styles.input}*/}
                {/*            inputBodyClass={styles.inputBody}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*/>*/}

                <Input
                    type={'text'}
                    placeholder={'Username'}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                />

                <Input
                    type={'email'}
                    placeholder={'Email'}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                />

                <Input
                    type={isPassword ? 'text' : 'password'}
                    placeholder={'Password'}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
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
                    placeholder={'Password confirmation'}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                >
                    <Image
                        className={styles.img}
                        src={isConfirm ? eyeOff : eye}
                        onClick={lockConfirmHandler}
                        alt={''}
                    />
                </Input>
            </div>

            <div>
                <Button className={styles.btn} theme={'primary'}>
                    Sign Up
                </Button>
                <h3 className={styles.subtitle}> Do you have an account?</h3>
                <Link className={styles.link} href={'/login'}>
                    {' '}
                    Sign In
                </Link>
            </div>
        </form>
    )
}
