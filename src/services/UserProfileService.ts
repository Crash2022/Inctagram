import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UpdateUserProfile, UserProfile } from '@/models/profile-types'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            return headers
        }
    }),
    tagTypes: ['ProfileData'],
    endpoints: (build) => ({
        getProfileData: build.query<UserProfile, any>({
            query: () => ({
                url: '/users/profile'
            }),
            providesTags: (result) => ['ProfileData']
        }),
        setProfileData: build.mutation<any, UpdateUserProfile>({
            query: (payload: UpdateUserProfile) => ({
                url: '/users/profile',
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['ProfileData']
        }),
        uploadAvatar: build.mutation<any, FormData>({
            query: (payload: FormData) => ({
                url: '/users/profile/avatar',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['ProfileData']
        }),
        deleteAvatar: build.mutation<any, any>({
            query: () => ({
                url: '/users/profile/avatar',
                method: 'DELETE'
            }),
            invalidatesTags: ['ProfileData']
        })
    })
})

export const {
    useGetProfileDataQuery,
    useSetProfileDataMutation,
    useUploadAvatarMutation,
    useDeleteAvatarMutation
} = userProfileAPI
