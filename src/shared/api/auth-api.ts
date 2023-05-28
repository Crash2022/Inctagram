import { instance } from '@/shared/api/api-instance'
import {
    LoginPayloadType,
    PasswordRecoveryType,
    RegistrationConfirmationPayloadType,
    RegistrationPayloadType
} from '@/models/auth-types'

export const authApi = {
    registration: async (arg: RegistrationPayloadType) => {
        return await instance.post<ResponseType>('auth/registration', arg)
    },
    registrationConfirmation: async (arg: RegistrationConfirmationPayloadType) => {
        return await instance.post<ResponseType>('auth/registration-confirmation', arg)
    },
    registrationResendLink: async (arg: { email: string }) => {
        return await instance.post<ResponseType>('auth/registration-email-resending', arg)
    },
    login: async (arg: LoginPayloadType) => {
        return await instance.post<ResponseType>('auth/login', arg)
    },
    logout: async () => {
        return await instance.post<ResponseType>('auth/logout')
    },
    me: async () => {
        return await instance.get<ResponseType>('auth/me')
    },
    forgotPassword: async (arg: PasswordRecoveryType) => {
        return await instance.post<ResponseType>(
            'auth/password-recovery',
            { arg },
            { withCredentials: true }
        )
    }
}
