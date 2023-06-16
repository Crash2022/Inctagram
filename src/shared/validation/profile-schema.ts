import * as yup from 'yup'
import { TranslateFn } from '@/shared/types/translate-type'

export const ProfileSchema = (t: TranslateFn) => {
    return yup.object().shape({
        userName: yup.string().min(6, t('Err_Yup_Min_Name')).max(30, t('Err_Yup_Max_Name')),
        firstName: yup.string().max(50, t('Err_Yup_Max_NameExtra')),
        lastName: yup.string().max(50, t('Err_Yup_Max_NameExtra')),
        city: yup.string().max(50, t('Err_Yup_Max_NameExtra')),
        // dateOfBirth: yup.string().max(50, t('Err_Yup_Max_NameExtra')),
        aboutMe: yup
            .string()
            .max(200, t('Err_Yup_Max_AboutMe'))
            .required(t('Err_Yup_Required'))
            .trim(t('Err_Yup_Trim_AboutMe'))
            .strict(true)
    })
}
