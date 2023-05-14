export interface RegistrationParamsType {
    userName: string
    email: string
    password: string
    captcha: boolean
}

export interface LoginParamsType {
    email: string
    password: string
}

export interface PassRecoveryType {
    email: string
}
