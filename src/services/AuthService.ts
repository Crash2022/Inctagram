import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegistrationParamsType } from '@/models/auth-types'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL
    }),
    endpoints: (build) => ({
        registration: build.mutation<any, any>({
            query: (registerParams: RegistrationParamsType) => ({
                url: '/registration',
                method: 'POST',
                body: registerParams
            })
        })
    })
})

export const { useAuthQuery } = authAPI
