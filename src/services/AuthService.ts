import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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
export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.BASE_URL
        baseUrl: baseURL
        // baseUrl: 'baseUrl'
    }),
    endpoints: (build) => ({
        // registration: {
        //     query: (args: { queryArg: RegistrationParamsType }) => ({
        //         url: '/auth/registration',
        //         method: 'POST',
        //         body: args.queryArg
        //     }),
        //     invalidatesTags: ['Users']
        // },
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
                prepareHeaders: (headers) => {
                    const token = localStorage.getItem('accessToken')
                    if (token) headers.set('authorization', `Bearer ${token}`)
                    console.log(headers)
                    return headers
                }
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
        })
    })
})

export const {
    useRegistrationMutation,
    useRegistrationConfirmationMutation,
    useLoginMutation,
    useLogoutMutation,
    useMeQuery,
    useForgotPasswordMutation,
    useNewPasswordMutation
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
