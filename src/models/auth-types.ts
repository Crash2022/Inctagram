export interface RegistrationPayloadType {
    userName: string
    email: string
    password: string
}

export interface RegistrationConfirmationPayloadType {
    confirmationCode: string
}

export interface LoginPayloadType {
    email: string
    password: string
}

export interface PasswordRecoveryType {
    email: string
    recaptcha: boolean
}

export interface NewPasswordType {
    newPassword: string
    recoveryCode: string
}

export interface MeResponseType {
    userId: number
    userName: string
    email: string
}
