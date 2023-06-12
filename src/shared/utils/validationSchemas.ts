import * as yup from 'yup'

export type TranslateFn = (key: string) => string;

export const LoginSchema = (t: TranslateFn) => yup.object().shape({
    email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email')),
    password: yup.string().required(t('Err_Yup_Required'))
})

export const SignUpSchema = (t: TranslateFn) => yup.object().shape({
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

export const ForgotSchema = (t: TranslateFn) => yup.object().shape({
    email: yup.string().required(t('Err_Yup_Required')).email(t('Err_Yup_Email'))
    // recaptcha: yup.boolean().oneOf([true], t('Robot'))
})

export const NewPasswordSchema = (t: TranslateFn) => yup.object().shape({
    newPassword: yup
        .string()
        .required(t('Err_Yup_Required'))
        .min(6, t('Err_Yup_Min'))
        .max(20, t('Err_Yup_Max_Password')),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), undefined], t('Err_Yup_FieldMatch'))
});
