import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginParamsType, RegistrationParamsType } from '@/models/auth-types';



export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://inctagram-api-git-main-shuliakleonid.vercel.app',
    }),
    endpoints: {
        registration: {
            query: (args: { queryArg: RegistrationParamsType }) => ({
                url: '/auth/registration',
                method: 'POST',
                body: args.queryArg,
            }),
            invalidatesTags: ['Users'],
        },
        login: {
            query: (payload: LoginParamsType) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload,
            }),
        },
        logout: {
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        },
    },
});

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } = authAPI;


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
