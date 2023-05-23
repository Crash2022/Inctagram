import { createApi } from '@reduxjs/toolkit/query/react'
import {
    LoginPayloadType,
    MeResponseType,
    NewPasswordType,
    PasswordRecoveryType,
    RegistrationConfirmationPayloadType,
    RegistrationPayloadType
} from '@/models/auth-types'
import { baseQueryWithReauth } from '@/shared/api/interceptor'

export const serviceAuthAPI = createApi({
    reducerPath: 'serviceAuthAPI',
    baseQuery: baseQueryWithReauth,
    // tagTypes: ['AuthService'],
    endpoints: (build) => ({
        registration: build.mutation<any, RegistrationPayloadType>({
            query: (payload: RegistrationPayloadType) => ({
                url: '/auth/registration',
                method: 'POST',
                body: payload
            })
        }),
        registrationConfirmation: build.mutation<any, RegistrationConfirmationPayloadType>({
            query: (payload: RegistrationConfirmationPayloadType) => ({
                url: '/auth/registration-confirmation',
                method: 'POST',
                body: payload
            })
        }),
        registrationResendLink: build.mutation<any, { email: string }>({
            query: (payload: { email: string }) => ({
                url: '/auth/registration-email-resending',
                method: 'POST',
                body: payload
            })
        }),
        login: build.mutation<any, LoginPayloadType>({
            query: (payload: LoginPayloadType) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload
            })
            // invalidatesTags: ['AuthService']
        }),
        logout: build.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        }),
        me: build.query<MeResponseType, void>({
            query: () => ({
                url: '/auth/me',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            // providesTags: (result) => ['AuthService']
        }),
        forgotPassword: build.mutation<any, PasswordRecoveryType>({
            query: (payload: PasswordRecoveryType) => ({
                url: '/auth/password-recovery',
                method: 'POST',
                body: payload
            })
        }),
        newPassword: build.mutation<any, NewPasswordType>({
            query: (payload: NewPasswordType) => ({
                url: '/auth/new-password',
                method: 'POST',
                body: payload
            })
        }),
        recoveryCode: build.mutation<{ email: string }, { recoveryCode: string }>({
            query: (payload: { recoveryCode: string }) => ({
                url: '/auth/check-recovery-code',
                method: 'POST',
                body: payload
            })
        }),
        updateTokens: build.mutation<{ accessToken: string }, any>({
            query: () => ({
                url: '/auth/update-tokens',
                method: 'POST'
            })
        })
    })
})

export const {
    useRegistrationMutation,
    useRegistrationConfirmationMutation,
    useRegistrationResendLinkMutation,
    useLoginMutation,
    useLogoutMutation,
    useMeQuery,
    useForgotPasswordMutation,
    useNewPasswordMutation,
    useRecoveryCodeMutation, // пока что не нужен
    useUpdateTokensMutation // используется в интерсепторе
} = serviceAuthAPI
