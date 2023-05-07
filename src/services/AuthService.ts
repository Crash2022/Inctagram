import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginParamsType, RegistrationParamsType } from '@/models/auth-types';
import dotenv from 'dotenv';

dotenv.config();
export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'baseUrl',
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
