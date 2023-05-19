import React from 'react'
import cls from './General.module.scss'
import ProfilePhoto from '../../../../public/assets/images/profile-photo.jpg'
import DeletePhotoIcon from '../../../../public/assets/icons/delete-circle-fill.svg'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'next-i18next'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateUserProfile } from '@/models/profile-types'
import { InctagramPath } from '@/shared/api/path'
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Textarea } from '@/shared/ui/Textarea/Textarea'

export const General = () => {
    const { t } = useTranslation('settings-general')

    const ProfileGeneralSchema = yup.object().shape({
        email: yup.string().required(t('Err_Yup_Required'))
    })

    const {
        control,
        handleSubmit,
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
        console.log('submit login', submitData)
        // await login(submitData).then((res) => {
        //     console.log('login response', res)
        // })
    }

    return (
        <form className={cls.profileSettings_general} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.general_mainBlock}>
                <div className={cls.general_photoBlock}>
                    <div className={cls.photo}>
                        <Image src={ProfilePhoto} alt={'profile-photo'} width={204} height={204} />
                        <div className={cls.add_photo}>
                            <DeletePhotoIcon width={30} height={30} />
                        </div>
                    </div>
                    <Button divClassName={cls.addPhoto_btn} theme={'outline'}>
                        {t('AddPhoto')}
                    </Button>
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

                    {/*<ControlledInput*/}
                    {/*    divClassName={cls.input}*/}
                    {/*    id={'P_S_General_AboutMe'}*/}
                    {/*    name={'aboutMe'}*/}
                    {/*    placeholder={t('AboutMe')}*/}
                    {/*    control={control}*/}
                    {/*    error={errors.aboutMe?.message}*/}
                    {/*/>*/}
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
