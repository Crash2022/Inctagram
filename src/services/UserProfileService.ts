import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Photo, UserProfile } from '@/models/profile-types'
import { MeResponseType, RegistrationPayloadType } from '@/models/auth-types'
import { baseURL } from '@/shared/api/baseURL'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (build) => ({
        getProfileData: build.query<UserProfile, void>({
            query: () => ({
                url: '/users/profile',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
        }),
        setProfileData: build.mutation<any, UserProfile>({
            query: (payload: UserProfile) => ({
                url: '/users/profile',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                method: 'PUT',
                body: payload
            })
        })
    })
})

export const { useGetProfileDataQuery, useSetProfileDataMutation } = userProfileAPI
