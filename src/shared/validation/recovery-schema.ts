import * as yup from 'yup'
import { TranslateFn } from '@/shared/types/translate-type'

export const RecoverySchema = (t: TranslateFn) => {
    return yup.object().shape({
        newPassword: yup
            .string()
            .required(t('Err_Yup_Required'))
            .min(6, t('Err_Yup_Min'))
            .max(20, t('Err_Yup_Max_Password')),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), undefined], t('Err_Yup_FieldMatch'))
    })
}

