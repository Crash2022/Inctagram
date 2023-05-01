import {instance} from "@/common/api/api.instance";


export const authAPI = {
    async registration(data: RegistrationParamsType) {
        return await instance.post<ResponseType>('auth/registration', data);
    },
    async login(data: LoginParamsType) {
        return await instance.post<ResponseType>('auth/login', data);
    },
    async passRecovery(data) {
        return await instance.post<ResponseType>('auth/password-recovery', data);
    },
    async logout() {
        return await instance.post<ResponseType>('auth/logout');
    },
    async me() {
        return await instance.get<ResponseType>('auth/me')
    }
}


export interface RegistrationParamsType {
    userName: string
    email: string
}

export interface LoginParamsType {
    XXX:string
}
 export interface PassRecoveryType {
     email: string
 }