import * as yup from 'yup'
import { TranslateFn } from '@/shared/types/translate-type'

export const RegistrationSchema = (t: TranslateFn) => {
    return yup.object().shape({
        userName: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(30, t('Err_Yup_Max_Name')),
        email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email')),
        password: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(20, t('Err_Yup_Max_Password')),
        confirmPassword: yup
            .string()
            .required(t('Err_Yup_Required'))
            .oneOf([yup.ref('password'), null], t('Err_Yup_FieldMatch'))
    })
}
