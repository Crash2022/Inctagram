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

export interface PassRecoveryType {
    email: string
}
