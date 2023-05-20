import { instance } from '@/shared/api/api-instance'
import {
    LoginPayloadType,
    PasswordRecoveryType,
    RegistrationPayloadType
} from '@/models/auth-types'

export const authApi = {
    register: async (arg: RegistrationPayloadType) => {
        return await instance.post<ResponseType>('auth/registration', arg)
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
    recoverPass: async (arg: PasswordRecoveryType) => {
        return await instance.post<ResponseType>(
            'auth/password-recovery',
            { arg },
            { withCredentials: true }
        )
    }
}
