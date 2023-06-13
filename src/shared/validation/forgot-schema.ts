import * as yup from 'yup'
import { TranslateFn } from '@/models/translate'

export const ForgotSchema = (t: TranslateFn) => {
    return yup.object().shape({
        email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email'))
        // recaptcha: yup.boolean().oneOf([true], t('Robot'))
    })
}
