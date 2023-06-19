import * as yup from 'yup'
import { TranslateFn } from '@/shared/types/translate-type'
import { onlyLettersRegExp, onlyLettersWithDashRegExp } from '@/shared/validation/validationRegExp'

export const ProfileSchema = (t: TranslateFn) => {
    return yup.object().shape({
        userName: yup.string().min(6, t('Err_Yup_Min_UserName')).max(30, t('Err_Yup_Max_UserName')),
        firstName: yup
            .string()
            .max(50, t('Err_Yup_Max_Name'))
            .matches(onlyLettersRegExp, {
                message: t('Err_Yup_OnlyLetters_Name'),
                excludeEmptyString: false
            }),
        lastName: yup
            .string()
            .max(50, t('Err_Yup_Max_Name'))
            .matches(onlyLettersRegExp, {
                message: t('Err_Yup_OnlyLetters_Name'),
                excludeEmptyString: false
            }),
        city: yup
            .string()
            .max(50, t('Err_Yup_Max_NameExtra'))
            .matches(onlyLettersWithDashRegExp, {
                message: t('Err_Yup_OnlyLettersWithDash_City'),
                excludeEmptyString: false
            }),
        // dateOfBirth: yup.string().max(50, t('Err_Yup_Max_NameExtra')),
        aboutMe: yup
            .string()
            .max(200, t('Err_Yup_Max_AboutMe'))
            .required(t('Err_Yup_Required'))
            .trim(t('Err_Yup_Trim_AboutMe'))
            .strict(true)
    })
}
