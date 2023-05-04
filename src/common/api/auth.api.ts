import { instance } from '@/common/api/api.instance'

export const authAPI = {
    register: async (arg: RegistrationParamsType) => {
        return await instance.post<ResponseType>('auth/registration', arg)
    },
    login: async (arg: LoginParamsType) => {
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

export interface RegistrationParamsType {
    userName: string
    email: string
}

export interface LoginParamsType {
    XXX: any
}

export interface PassRecoveryType {
    email: string
}
