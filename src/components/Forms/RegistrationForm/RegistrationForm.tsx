import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Title } from '@/components/Forms/components/Title'
// import Image from 'next/image'
// import { Input } from '@/components/Forms/components/Input'
import { Input } from '@/shared/ui/Input/Input'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import GoogleIcon from 'public/assets/icons/googleIcon.svg'
import GitIcon from 'public/assets/icons/gitIcon.svg'
// import eye from 'public/assets/icons/eye.svg'
// import eyeOff from 'public/assets/icons/eye-off.svg'
// import { useEffect } from 'react'
import { useRegistrationMutation } from '@/services/AuthService'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { RegistrationParamsType } from '@/models/auth-types'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useEffect, useRef } from 'react'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { usePush } from '@/shared/hooks/usePush'

export const RegistrationForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('registration')
    const push = usePush()
    const [registration, { onSuccess, error, isError, isLoading }] = useRegistrationMutation()

    // const [userName, setUserName] = useState<string>('')
    // const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    // const [confirmPassword, setConfirmPassword] = useState<string>('')

    // const [isPassword, setIsPassword] = useState(false)
    // const [isConfirm, setIsConfirm] = useState(false)

    // const lockPasswordHandler = () => {
    //     setIsPassword(!isPassword)
    // }
    //
    // const lockConfirmHandler = () => {
    //     setIsConfirm(!isConfirm)
    // }

    const { control, handleSubmit } = useForm<RegistrationParamsType>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<RegistrationParamsType> = async (
        data: RegistrationParamsType
    ) => {
        console.log('submit', data)
        await registration(data).then((res) => console.log(res))
    }

    useEffect(() => {
        if (error) {
            push('/login').then()
        }
        // error && enqueueSnackbar('Ошибка', { variant: 'error', autoHideDuration: 2000 })
    }, [error, push])

    if (isLoading) return <LoaderScreen variant={'loader'} />
    else {
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
                        render={({ field }) => (
                            <Input {...field} id={'Reg_Username'} placeholder={t('Username')} />
                        )}
                    />
                    {/*<Input*/}
                    {/*    id={'Reg_Username'}*/}
                    {/*    placeholder={'Username'}*/}
                    {/*    // className={styles.input}*/}
                    {/*    // inputBodyClass={styles.inputBody}*/}
                    {/*/>*/}

                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) => (
                            <Input {...field} id={'Reg_Email'} placeholder={t('Email')} />
                        )}
                    />
                    {/*<Input*/}
                    {/*    id={'Reg_Email'}*/}
                    {/*    placeholder={'Email'}*/}
                    {/*    // className={styles.input}*/}
                    {/*    // inputBodyClass={styles.inputBody}*/}
                    {/*/>*/}

                    <Controller
                        name='password'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id={'Reg_Password'}
                                placeholder={t('Password')}
                                password
                            />
                        )}
                    />
                    {/*<Input*/}
                    {/*    id={'Reg_Password'}*/}
                    {/*    password*/}
                    {/*    placeholder={'Password'}*/}
                    {/*    // className={styles.input}*/}
                    {/*    // inputBodyClass={styles.inputBody}*/}
                    {/*/>*/}
                    {/*    <Image*/}
                    {/*        className={styles.img}*/}
                    {/*        src={isPassword ? eyeOff : eye}*/}
                    {/*        onClick={lockPasswordHandler}*/}
                    {/*        alt={'eye-icon'}*/}
                    {/*    />*/}
                    {/*</Input>*/}

                    <Controller
                        name='confirmPassword'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id={'Reg_ConfirmPassword'}
                                placeholder={t('ConfirmPassword')}
                                password
                            />
                        )}
                    />
                    {/*<Input*/}
                    {/*    id={'Reg_ConfirmPassword'}*/}
                    {/*    password*/}
                    {/*    placeholder={'Password confirmation'}*/}
                    {/*    // className={styles.input}*/}
                    {/*    // inputBodyClass={styles.inputBody}*/}
                    {/*/>*/}
                    {/*    <Image*/}
                    {/*        className={styles.img}*/}
                    {/*        src={isConfirm ? eyeOff : eye}*/}
                    {/*        onClick={lockConfirmHandler}*/}
                    {/*        alt={'eye-icon'}*/}
                    {/*    />*/}
                    {/*</Input>*/}
                </div>

                <div>
                    <Button className={styles.btn} theme={'primary'} type={'submit'}>
                        {t('SignUp')}
                    </Button>
                    <h3 className={styles.subtitle}>{t('HaveAccount')}</h3>
                    <Link className={styles.link} href={'/login'}>
                        {' '}
                        {t('SignIn')}
                    </Link>
                </div>
            </form>
        )
    }
}

// import * as yup from 'yup'
// export const Schema = yup.object({
//     email: yup
//         .string()
//         .email('Email must be a valid email')
//         .required('Email is required'),
//     password: yup
//         .string()
//         .min(8, 'Password must be at least 8 characters')
//         .required('Password is required')
// })
//
//     const {
//         handleSubmit,
//         control,
//         register,
//         formState: { errors }
//     } = useForm<LoginForm>({
//         defaultValues: {
//             email: '',
//             password: '',
//             rememberMe: false
//         },
//         mode: 'all',
//         resolver: yupResolver(Schema)
//     })
//
//     const onSubmit: SubmitHandler<LoginForm> = async data => {
//         await login(data)
//     }
//
//     const errorHandler = errorMessageHandler(
//         (loginError as FetchError)?.data?.error
//     )
//
//     const disableButton =
//         !!errors.email?.message ||
//         !!errors.password?.message ||
//         !!errors.rememberMe?.message ||
//         isLoginLoading
//
//     const isBundleLoading = isLoginLoading
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             {isBundleLoading ? <LinearPageLoader /> : null}
//             <BoxCard>
//                 <Title marginBottom={'17px'}>Sign in</Title>
//                 <Controller
//                     name={'email'}
//                     control={control}
//                     render={({ field }) => (
//                         <TextField
//                             title={'Email'}
//                             error={errors?.email?.message}
//                             textFieldMode={'nonOutlined'}
//                             {...field}
//                         />
//                     )}
//                 />
//                 <Controller
//                     name={'password'}
//                     control={control}
//                     render={({ field }) => (
//                         <TextField
//                             error={errors?.password?.message}
//                             title={'Password'}
//                             showPassword
//                             textFieldMode={'nonOutlined'}
//                             {...field}
//                         />
//                     )}
//                 />
//                 <StyledFormGroup>
//                     <StyledCheckboxLabel>
//                         <StyledFormCheckbox {...register('rememberMe')} type={'checkbox'} />
//                         <Span nonSelect bold>
//                             Remember me
//                         </Span>
//                     </StyledCheckboxLabel>
//                 </StyledFormGroup>
//                 <StyledFormGroup margin={'0 0 45px 0'}>
//                     <AppLink
//                         to={AppPaths.forgotPasswordPage}
//                         secondary
//                         justifyContent={'flex-end'}
//                     >
//                         Forgot Password?
//                     </AppLink>
//                 </StyledFormGroup>
//                 <Button disabled={disableButton}>Sign in</Button>
//                 <Span medium>Already have an account?</Span>
//                 <AppLink primary to={AppPaths.registrationPage}>
//                     Sign Up
//                 </AppLink>
//             </BoxCard>
//             <ErrorAlert errorMessage={errorHandler} />
//         </form>
//     )
// }
