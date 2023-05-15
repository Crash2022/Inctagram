import { instance } from '@/shared/api/api.instance'
import { LoginPayloadType, PassRecoveryType, RegistrationPayloadType } from '@/models/auth-types'

export const authAPI = {
    register: async (arg: RegistrationPayloadType) => {
        return await instance.post<ResponseType>('auth/registration', arg)
    },
    login: async (arg: LoginPayloadType) => {
        return await instance.post<ResponseType>('auth/login', arg)
    },
    recoverPass: async (arg: PassRecoveryType) => {
        return await instance.post<ResponseType>(
            'auth/password-recovery',
            { arg },
            { withCredentials: true }
        )
    },
    logout: async () => {
        return await instance.post<ResponseType>('auth/logout')
    },
    me: async () => {
        return await instance.get<ResponseType>('auth/me')
    }
}
