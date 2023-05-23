import React, { ChangeEvent, useEffect, useState } from 'react'
import cls from './General.module.scss'
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
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
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
import { uploadImage } from '@/shared/utils/uploadFile'

export const General = () => {
    const { t } = useTranslation('settings-general')
    const { enqueueSnackbar } = useSnackbar()
    const [userAvatar, setUserAvatar] = useState(DefaultProfileAvatar)

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

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
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

    const onSubmit: SubmitHandler<UpdateUserProfile> = async (submitData: UpdateUserProfile) => {
        console.log('submit profile', submitData)
        const res = await setProfileData(submitData)
        console.log('profile response', res)
    }

    const uploadAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('uploading avatar')

        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0]

            if (file && file.size < 7000000) {
                console.log('file', file)
                setUserAvatar(URL.createObjectURL(file))
                let formData = new FormData()
                formData.append('avatarImage', file, file.name)
                console.log('formData', formData)
                uploadAvatar(formData)
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                enqueueSnackbar('Файл слишком большого размера', {
                    variant: 'warning',
                    autoHideDuration: 3000
                })
            }
        }
    }

    // const uploadAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     console.log('upload')
    //     uploadImage(event, setAvatar, async (file64) => {
    //         uploadAvatar(file64)
    //     })
    // }

    // const uploadAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length) {
    //         const file = e.target.files[0]
    //
    //         console.log('file', file)
    //
    //         if (file.size < 7000000) {
    //             convertFileToBase64(file, async (file64: string) => {
    //                 console.log('мы попали в загрузку')
    //                 setAvatar(file64)
    //                 const avatarResponse = await uploadAvatar(file64)
    //             })
    //         } else {
    //             console.error('Error: ', 'Файл слишком большого размера')
    //             enqueueSnackbar('Файл слишком большого размера', {
    //                 variant: 'warning',
    //                 autoHideDuration: 3000
    //             })
    //         }
    //     }
    // }
    //
    // const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    //     const reader = new FileReader()
    //     reader.onloadend = () => {
    //         const file64 = reader.result as string
    //         callBack(file64)
    //     }
    //     reader.readAsDataURL(file)
    // }

    useEffect(() => {
        if (profileData) {
            setValue('userName', profileData.userName)
            setValue('firstName', profileData.firstName)
            setValue('lastName', profileData.lastName)
            setValue('city', profileData.city)
            setValue('dateOfBirth', profileData.dateOfBirth)
            setValue('aboutMe', profileData.aboutMe)
        }
    }, [profileData])

    useEffect(() => {
        if (uploadAvatarIsError) {
            console.log(uploadAvatarError)
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
                        <Image
                            src={
                                profileData && profileData.avatars.length !== 0
                                    ? profileData.avatars[0].url
                                    : userAvatar
                            }
                            alt={'profile-avatar'}
                            width={204}
                            height={204}
                        />
                        <div
                            className={cls.delete_avatar}
                            onClick={async () => {
                                await deleteAvatar()
                            }}
                        >
                            <DeletePhotoIcon width={30} height={30} />
                        </div>
                    </div>
                    <div className={cls.addAvatar_btn}>
                        {/*<InputFile title={t('AddPhoto')} uploadFunction={uploadAvatarHandler} />*/}
                        <input type='file' onChange={uploadAvatarHandler} />
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
                    <ControlledInput
                        divClassName={cls.input}
                        id={'P_S_General_DateOfBirth'}
                        name={'dateOfBirth'}
                        placeholder={t('DateOfBirth')}
                        control={control}
                        error={errors.dateOfBirth?.message}
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
