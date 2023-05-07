import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginParamsType, RegistrationParamsType } from '@/models/auth-types'
import { baseURL } from '@/shared/api/baseURL'
import dotenv from 'dotenv'

dotenv.config()
export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        // baseUrl: process.env.BASE_URL
        baseUrl: baseURL
    }),
    endpoints: (build) => ({
        // registration: build.mutation<any, RegistrationParamsType>({
        //     query: (payload: RegistrationParamsType) => ({
        //         url: '/auth/registration',
        //         method: 'POST',
        //         body: payload
        //     })
        // }),
        registration: {
            query: (args: { queryArg: RegistrationParamsType }) => ({
                url: '/auth/registration',
                method: 'POST',
                body: args.queryArg
            }),
            invalidatesTags: ['Users']
        },
        login: build.mutation<any, LoginParamsType>({
            query: (payload: LoginParamsType) => ({
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
        })
    })
})

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } = authAPI

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
