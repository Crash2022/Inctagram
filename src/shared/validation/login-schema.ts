import * as yup from 'yup'
import { TranslateFn } from '@/shared/types/translate-type'

export const LoginSchema = (t: TranslateFn) => {
    return yup.object().shape({
        email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email')),
        password: yup.string().required(t('Err_Yup_Required'))
    })
}
