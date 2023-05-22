import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserProfile } from '@/models/profile-types'
import { baseURL } from '@/shared/api/baseURL'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: ['ProfileData'],
    endpoints: (build) => ({
        getProfileData: build.query<UserProfile, void>({
            query: () => ({
                url: '/users/profile',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }),
            providesTags: (result) => ['ProfileData']
        }),
        setProfileData: build.mutation<any, UserProfile>({
            query: (payload: UserProfile) => ({
                url: '/users/profile',
                method: 'PUT',
                body: payload,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }),
            invalidatesTags: ['ProfileData']
        })
    })
})

export const { useGetProfileDataQuery, useSetProfileDataMutation } = userProfileAPI
