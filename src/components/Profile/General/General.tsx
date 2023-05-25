import React, { ChangeEvent, useEffect, useState } from 'react'
import cls from './General.module.scss'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import DefaultProfileAvatar from '../../../../public/assets/images/default-avatar.png'
import DeletePhotoIcon from '../../../../public/assets/icons/delete-circle-red.svg'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'next-i18next'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { UpdateUserProfile } from '@/models/profile-types'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import {
    useDeleteAvatarMutation,
    useGetProfileDataQuery,
    useSetProfileDataMutation,
    useUploadAvatarMutation
} from '@/services/UserProfileService'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { useSnackbar } from 'notistack'
import { Input } from '@/shared/ui/Input/Input'
import Datepicker from '@/shared/ui/Datepicker/Datepicker'

export const General = () => {
    const { t } = useTranslation('settings-general')
    const { enqueueSnackbar } = useSnackbar()
    const [userAvatar, setUserAvatar] = useState<string>('/assets/images/default-avatar.png')
    // const [userAvatarTest, setUserAvatarTest] = useState<string>('/assets/images/default-avatar.png')
    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const { data: profileData, isLoading } = useGetProfileDataQuery()
    const [
        setProfileData,
        { data: setProfileDataResponse, isError: isSetError, isLoading: setProfileIsLoading }
    ] = useSetProfileDataMutation()
    const [
        uploadAvatar,
        {
            data: uploadAvatarResult,
            error: uploadAvatarError,
            isError: uploadAvatarIsError,
            isLoading: uploadAvatarIsLoading
        }
    ] = useUploadAvatarMutation()
    const [
        deleteAvatar,
        { data: deleteAvatarResult, error: deleteAvatarError, isLoading: deleteAvatarIsLoading }
    ] = useDeleteAvatarMutation()

    const ProfileGeneralSchema = yup.object().shape({
        userName: yup.string().min(6, t('Err_Yup_Min')).max(30, t('Err_Yup_Max_Name')),
        aboutMe: yup.string().max(200, t('Err_Yup_Max_AboutMe'))
    })

    const dateTest = new Date()
    const month =
        dateTest.getMonth() + 1 < 10 ? `0${dateTest.getMonth() + 1}` : `${dateTest.getMonth() + 1}`
    const day = dateTest.getDate() < 10 ? `0${dateTest.getDate()}` : `${dateTest.getDate()}`
    const fullDate = `${dateTest.getFullYear()}-${month}-${day}`
    console.log(fullDate)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm<UpdateUserProfile>({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            city: '',
            dateOfBirth: '',
            aboutMe: ''
        },
        resolver: yupResolver(ProfileGeneralSchema)
    })
    watch(['dateOfBirth'])

    const onSubmit: SubmitHandler<UpdateUserProfile> = async (submitData: UpdateUserProfile) => {
        console.log('submit profile', submitData)
        const res = await setProfileData(submitData)
        console.log('profile response', res)
    }

    const uploadAvatarHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        console.log('uploading avatar')

        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0]

            if (file && file.size < 1000000) {
                console.log('file', file)

                const formData = new FormData()
                formData.append('file', file)

                try {
                    await uploadAvatar(formData)
                    // setUserAvatar(URL.createObjectURL(file))
                    setUserAvatar(
                        profileData.avatars.length !== 0
                            ? profileData.avatars[0].url
                            : '/assets/images/default-avatar.png'
                    )
                    location.reload() // принудительная перезагрузка компоненты
                } catch {
                    enqueueSnackbar('ОШИБКА!', {
                        variant: 'error',
                        autoHideDuration: 3000
                    })
                }
            } else {
                enqueueSnackbar(t('Snackbar_LargeSizeAvatar'), {
                    variant: 'error',
                    autoHideDuration: 3000
                })
            }
        }
    }

    const deleteAvatarHandler = async () => {
        if (profileData.avatars.length === 0) {
            enqueueSnackbar(t('Snackbar_NoAvatar'), {
                variant: 'info',
                autoHideDuration: 3000
            })
        } else {
            await deleteAvatar()
            setUserAvatar('/assets/images/default-avatar.png')
        }
    }

    const imageErrorHandler = () => {
        setIsAvaBroken(true)
        enqueueSnackbar(t('Snackbar_ErrorAvatar'), {
            variant: 'error',
            autoHideDuration: 3000
        })
    }

    useEffect(() => {
        if (profileData) {
            setValue('userName', profileData.userName)
            setValue('firstName', profileData.firstName)
            setValue('lastName', profileData.lastName)
            setValue('city', profileData.city)
            setValue('dateOfBirth', profileData.dateOfBirth.slice(0, 10))
            setValue('aboutMe', profileData.aboutMe)

            setUserAvatar(
                profileData.avatars.length !== 0
                    ? profileData.avatars[0].url
                    : '/assets/images/default-avatar.png'
            )
        }
    }, [profileData])

    useEffect(() => {
        if (uploadAvatarIsError) {
            console.log(uploadAvatarError)
            enqueueSnackbar(t('Snackbar_UploadAvatarError'), {
                variant: 'error',
                autoHideDuration: 3000
            })
        }
    }, [])

    console.log('profileData', profileData)

    if (isLoading) return <LoaderScreen variant={'loader'} />
    if (setProfileIsLoading) return <LoaderScreen variant={'loader'} />
    if (uploadAvatarIsLoading) return <LoaderScreen variant={'loader'} />
    if (deleteAvatarIsLoading) return <LoaderScreen variant={'loader'} />

    return (
        <form className={cls.profileSettings_general} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.general_mainBlock}>
                <div className={cls.general_photoBlock}>
                    <div className={cls.avatar}>
                        <img
                            // src={
                            //     profileData.avatars.length !== 0
                            //         ? profileData.avatars[0].url
                            //         : '/assets/images/default-avatar.png'
                            // }
                            src={userAvatar}
                            alt={'profile-avatar'}
                            width={'204px'}
                            height={'204px'}
                            onError={imageErrorHandler}
                            // quality={100}
                            // priority
                        />
                        <div className={cls.delete_avatar} onClick={deleteAvatarHandler}>
                            <DeletePhotoIcon width={30} height={30} />
                        </div>
                    </div>
                    <div className={cls.addAvatar_btn}>
                        <InputFile
                            id={'Upload_Avatar'}
                            title={t('AddPhoto')}
                            onChangeUpload={uploadAvatarHandler}
                        />
                    </div>
                </div>
                <div className={cls.general_infoBlock}>
                    <ControlledInput
                        divClassName={cls.input}
                        id={'P_S_General_UserName'}
                        name={'userName'}
                        placeholder={t('UserName')}
                        control={control}
                        error={errors.userName?.message}
                    />
                    <ControlledInput
                        divClassName={cls.input}
                        id={'P_S_General_FirstName'}
                        name={'firstName'}
                        placeholder={t('FirstName')}
                        control={control}
                        error={errors.firstName?.message}
                    />
                    <ControlledInput
                        divClassName={cls.input}
                        id={'P_S_General_LastName'}
                        name={'lastName'}
                        placeholder={t('LastName')}
                        control={control}
                        error={errors.lastName?.message}
                    />
                    <ControlledInput
                        divClassName={cls.input}
                        id={'P_S_General_City'}
                        name={'city'}
                        placeholder={t('City')}
                        control={control}
                        error={errors.city?.message}
                    />
                    <Datepicker
                        name='dateOfBirth'
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Enter Date of birth'
                            }
                        }}
                        render={({ field }: any) => (
                            <Input
                                type={'date'}
                                {...field}
                                placeholder={t('DateOfBirth')}
                                error={errors.dateOfBirth?.message}
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value)
                                }}
                                max={fullDate}
                            />
                        )}
                    />
                    <div className={cls.textarea}>
                        <Controller
                            name={'aboutMe'}
                            control={control}
                            render={({ field }: any) => (
                                <Textarea
                                    {...field}
                                    placeholder={t('AboutMe')}
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    error={errors.aboutMe?.message}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <Button
                divClassName={cls.save_btn}
                className={styles.btn}
                theme={'primary'}
                type={'submit'}
            >
                {t('Save')}
            </Button>
        </form>
    )
}
