import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    LoginPayloadType,
    MeResponseType,
    RegistrationConfirmationPayloadType,
    RegistrationPayloadType
} from '@/models/auth-types'
import { baseURL } from '@/shared/api/baseURL'
import dotenv from 'dotenv'
import { Photo } from '@/models/userProfileService-types'

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
        me: build.query<MeResponseType, any>({
            query: () => ({
                url: '/auth/me'
            })
        })
    })
})

export const {
    useRegistrationMutation,
    useRegistrationConfirmationMutation,
    useLoginMutation,
    useLogoutMutation,
    useMeQuery
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
