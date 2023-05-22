import React, { useEffect, useState } from 'react'
import cls from './General.module.scss'
import ProfilePhoto from '../../../../public/assets/images/profile-photo.jpg'
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

export const General = () => {
    const { t } = useTranslation('settings-general')
    const { enqueueSnackbar } = useSnackbar()
    const [avatar, setAvatar] = useState<string>('')

    const { data: profileData, isLoading } = useGetProfileDataQuery()
    const [setProfile, { data: setProfileData, isError: isSetError, isLoading: isSetLoading }] =
        useSetProfileDataMutation()
    const [
        uploadAvatar,
        { data: uploadAvatarResult, error: uploadAvatarError, isLoading: uploadAvatarIsLoading }
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
        const res = await setProfile(submitData)
        console.log('profile response', res)
    }

    const uploadAvatarHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 7000000) {
                convertFileToBase64(file, async (file64: string) => {
                    setAvatar(file64)
                    const avatarResponse = await uploadAvatar(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
                enqueueSnackbar('Файл слишком большого размера', {
                    variant: 'warning',
                    autoHideDuration: 3000
                })
            }

            // if (file.size < 4000000) {
            //     try {
            //         const uploadResponse = await uploadPhoto(file)
            //
            //         console.log(uploadResponse.data)
            //         const photoUrl = uploadResponse.data[0]?.url
            //         if (photoUrl) setUploadedImage(photoUrl)
            //     } catch (error) {
            //         console.error('Error uploading file:', error)
            //     }
            // }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (profileData) {
            setValue('userName', profileData.userName)
            setValue('firstName', profileData.firstName)
            setValue('lastName', profileData.lastName)
            setValue('city', profileData.city)
            setValue('dateOfBirth', profileData.dateOfBirth)
            setValue('aboutMe', profileData.aboutMe)
        }

        // if (profileData.avatars.length === 0) {
        //     setAvatar(DefaultProfileAvatar)
        // } else {
        //     setAvatar(profileData.avatars[0].url)
        // }
    }, [profileData])

    console.log('profileData', profileData)

    if (isLoading) return <LoaderScreen variant={'loader'} />
    if (isSetLoading) return <LoaderScreen variant={'loader'} />
    if (uploadAvatarIsLoading) return <LoaderScreen variant={'loader'} />
    if (deleteAvatarIsLoading) return <LoaderScreen variant={'loader'} />

    return (
        <form className={cls.profileSettings_general} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.general_mainBlock}>
                <div className={cls.general_photoBlock}>
                    <div className={cls.avatar}>
                        <img
                            src={
                                profileData.avatars.length === 0
                                    ? DefaultProfileAvatar
                                    : profileData.avatars[0].url
                            }
                            alt={'profile-avatar'}
                            width={204}
                            height={204}
                        />
                        {/*<Image*/}
                        {/*    src={*/}
                        {/*        profileData.avatars.length === 0*/}
                        {/*            ? DefaultProfileAvatar*/}
                        {/*            : profileData.avatars[0].url*/}
                        {/*    }*/}
                        {/*    alt={'profile-avatar'}*/}
                        {/*    width={204}*/}
                        {/*    height={204}*/}
                        {/*/>*/}
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
                        <InputFile title={t('AddPhoto')} onChange={uploadAvatarHandler} />
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
