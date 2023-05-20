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
// import dotenv from 'dotenv'
// import { Photo } from '@/models/userProfileService-types'

// dotenv.config()

// const myBaseQuery = fetchBaseQuery({
//     baseUrl: baseURL,
//     // Add your custom interceptor logic here
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`)
//         }
//         return headers
//     },
// })

// test commit

// const baseQuery = fetchBaseQuery({ baseUrl: baseURL })
// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//     args,
//     api,
//     extraOptions
// ) => {
//     let result = await baseQuery(args, api, extraOptions)
//     if (result.error && result.error.status === 401) {
//         // my logic here
//         endpoints: (build) => ({
//             updateTokens: build.mutation<{ accessToken: string }, any>({
//                 query: () => ({
//                     url: '/auth/registration',
//                     method: 'POST'
//                 })
//             })
//         })
//     }
//     return result
// }

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.BASE_URL
        baseUrl: baseURL
    }),
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
                //         if (token) headers.set('authorization', `Bearer ${token}`)
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
        // tokenRefresh: build.query<{ accessToken: string }, void>({
        //     queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        //         const response = await fetch(`/api/refresh`)
        //         return response.ok
        //             ? { data: await response.json() }
        //             : { error: await response.json() }
        //     }
        // })
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
    useUpdateTokensMutation // добавить в интерсептор
} = authAPI

// export const registerApiSlice = createApi({
//     reducerPath: 'register/api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//         credentials: 'include'
//     }) as BaseQueryFn<string | FetchArgs, unknown, FetchError, {}>,
//     endpoints: builder => ({
//         registerUser: builder.mutation<
//             RegistrationResponseType,
//             RegisterUserPayload
//             >({
//             query: (payload: RegisterUserPayload) => ({
//                 url: 'auth/register',
//                 method: 'POST',
//                 body: payload
//             })
//         })
//     })
// })

// export const loginApiSlice = createApi({
//     reducerPath: 'login/api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//         credentials: 'include'
//     }) as BaseQueryFn<string | FetchArgs, unknown, FetchError, {}>,
//     endpoints: builder => ({
//         login: builder.mutation<UserLoggedInResponse, LoginPayload>({
//             query: (payload: LoginPayload) => ({
//                 url: 'auth/login',
//                 method: 'POST',
//                 body: payload
//             }),
//             async onQueryStarted(payload, { dispatch, queryFulfilled }) {
//                 const res = await queryFulfilled
//                 dispatch(setUserData(res.data))
//             }
//         })
//     })
// })
//
// export const { useLoginMutation } = loginApiSlice
