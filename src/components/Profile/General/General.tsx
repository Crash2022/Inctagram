import React, { ChangeEvent, useEffect, useState } from 'react'
import cls from './General.module.scss'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import DefaultProfileAvatar from '../../../../public/assets/images/default-avatar.png'
import DeletePhotoIcon from '../../../../public/assets/icons/delete-circle-red.svg'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'next-i18next'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateUserProfile } from '@/shared/types/profile-types'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import {
    useDeleteAvatarMutation,
    useGetProfileDataQuery,
    useSetProfileDataMutation,
    useUploadAvatarMutation
} from '@/services/UserProfileService'
import { useSnackbar } from 'notistack'
import { profileDate } from '@/shared/utils/dateNowForProfileSetting'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { ControlledTextarea } from '@/shared/ui/Controlled/ControlledTextarea'
import { ProfileSchema } from '@/shared/validation/profile-schema'

export const General = () => {
    const { t } = useTranslation('settings-general')
    const { enqueueSnackbar } = useSnackbar()
    const [userAvatar, setUserAvatar] = useState<string>(DefaultProfileAvatar)
    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const { data: profileData, isLoading } = useGetProfileDataQuery({})
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

    const {
        control,
        handleSubmit,
        setValue,
        watch,
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
        resolver: yupResolver(ProfileSchema(t))
    })

    const onSubmit: SubmitHandler<UpdateUserProfile> = async (submitData: UpdateUserProfile) => {
        console.log('submit profile', submitData)
        const res = await setProfileData(submitData)
        console.log('profile response', res)
    }

    const uploadAvatarHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0]

            if (file && file.size < 1000000) {
                const formData = new FormData()
                formData.append('file', file)

                try {
                    await uploadAvatar(formData)
                    setUserAvatar(URL.createObjectURL(file))
                    // await router.push(InctagramPath.PROFILE.PROFILE)

                    // setUserAvatar(
                    //     profileData.avatars.length !== 0
                    //         ? profileData.avatars[0].url
                    //         : '/assets/images/default-avatar.png'
                    // )

                    // location.reload() // принудительная перезагрузка компоненты
                } catch (e) {
                    console.log('upload avatar error', e)
                    enqueueSnackbar(t('Snackbar_ErrorAvatar'), {
                        variant: 'error',
                        autoHideDuration: 3000
                    })
                }
            } else {
                enqueueSnackbar(t('Snackbar_LargeImageSize'), {
                    variant: 'error',
                    autoHideDuration: 3000
                })
            }
        }
    }

    const deleteAvatarHandler = async () => {
        if (profileData && profileData.avatars.length === 0) {
            enqueueSnackbar(t('Snackbar_NoAvatar'), {
                variant: 'info',
                autoHideDuration: 3000
            })
        } else {
            await deleteAvatar({})
            setUserAvatar(DefaultProfileAvatar)
        }
    }

    const imageErrorHandler = () => {
        setIsAvaBroken(true)
        enqueueSnackbar(t('Snackbar_ErrorImage'), {
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
            setValue(
                'dateOfBirth',
                profileData.dateOfBirth !== null ? profileData.dateOfBirth.slice(0, 10) : ''
            )
            setValue('aboutMe', profileData.aboutMe)

            // setUserAvatar(
            //     profileData.avatars.length !== 0
            //         ? profileData.avatars[0].url
            //         : '/assets/images/default-avatar.png'
            // )
        }
    }, [profileData])

    useEffect(() => {
        if (uploadAvatarIsError) {
            console.log(uploadAvatarError)
            enqueueSnackbar(t('Snackbar_UploadImageError'), {
                variant: 'error',
                autoHideDuration: 3000
            })
        }
    }, [])

    // console.log('profileData', profileData)

    if (isLoading) return <LoaderScreen variant={'circle'} />
    if (setProfileIsLoading) return <LoaderScreen variant={'circle'} />
    if (uploadAvatarIsLoading) return <LoaderScreen variant={'circle'} />
    if (deleteAvatarIsLoading) return <LoaderScreen variant={'circle'} />

    return (
        <form className={cls.profileSettings_general} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.general_mainBlock}>
                <div className={cls.general_photoBlock}>
                    <div className={cls.avatar} id={'Avatar_Div'}>
                        <Image
                            src={
                                profileData && profileData.avatars.length !== 0
                                    ? profileData.avatars[0].url
                                    : DefaultProfileAvatar
                            }
                            alt={'profile-avatar'}
                            id={'User_Avatar'}
                            width={204}
                            height={204}
                            onError={imageErrorHandler}
                            quality={100}
                            priority
                        />
                        <div className={cls.delete_avatar} onClick={deleteAvatarHandler}>
                            <DeletePhotoIcon />
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
                    <ControlledInput
                        divClassName={cls.inputDate}
                        id={'P_S_General_DateOfBirth'}
                        name={'dateOfBirth'}
                        placeholder={t('DateOfBirth')}
                        control={control}
                        error={errors.dateOfBirth?.message}
                        type={'date'}
                        max={profileDate}
                    />
                    <ControlledTextarea
                        divClassName={cls.textarea}
                        name={'aboutMe'}
                        placeholder={t('AboutMe')}
                        control={control}
                        error={errors.aboutMe?.message}
                    />
                    <div className={cls.textarea_length}>{watch('aboutMe').length} / 200</div>
                </div>
            </div>

            <Button
                divClassName={cls.save_btn}
                className={styles.btn}
                theme={'primary'}
                type={'submit'}
                disabled={watch('aboutMe').length > 200}
            >
                {t('Save')}
            </Button>
        </form>
    )
}
