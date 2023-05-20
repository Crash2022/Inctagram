import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import {
    LoginPayloadType,
    MeResponseType,
    NewPasswordType,
    PasswordRecoveryType,
    RegistrationConfirmationPayloadType,
    RegistrationPayloadType
} from '@/models/auth-types'
import { baseURL } from '@/shared/api/baseURL'

// interceptor
const baseQuery = fetchBaseQuery({ baseUrl: baseURL })
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery('/auth/update-tokens', api, extraOptions)
        if (refreshResult.data.accessToken) {
            // if (refreshResult.data) {
            // store the new token
            // api.dispatch(tokenReceived(refreshResult.data))

            localStorage.setItem('accessToken', refreshResult.data.accessToken)
            await serviceAuthAPI.endpoints.me()

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            // api.dispatch(logout())
            await serviceAuthAPI.endpoints.logout()
        }
    }
    return result
}

// Auth Service
export const serviceAuthAPI = createApi({
    reducerPath: 'serviceAuthAPI',
    baseQuery: baseQueryWithReauth,
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
                // credentials: 'include',
                // prepareHeaders: async (headers, { extra }) => {
                //     try {
                //         const token = localStorage.getItem('accessToken')
                //         if (token) headers.set('Authorization', `Bearer ${token}`)
                //         console.log(headers)
                //         return headers
                //     } catch (error) {
                //         console.log(error)
                //     }
                // }
            })
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
    useRegistrationResendLinkMutation, // надо добавить в ошбику при регистрации
    useLoginMutation,
    useLogoutMutation,
    useMeQuery,
    useForgotPasswordMutation,
    useNewPasswordMutation,
    useRecoveryCodeMutation, // пока что не нужен
    useUpdateTokensMutation
} = serviceAuthAPI
