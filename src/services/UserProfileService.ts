import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserProfile } from '@/models/profile-types'
import { baseURL } from '@/shared/api/baseURL'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            return headers
        }
    }),
    tagTypes: ['ProfileData'],
    endpoints: (build) => ({
        getProfileData: build.query<UserProfile, void>({
            query: () => ({
                url: '/users/profile'
            }),
            providesTags: (result) => ['ProfileData']
        }),
        setProfileData: build.mutation<any, UserProfile>({
            query: (payload: UserProfile) => ({
                url: '/users/profile',
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['ProfileData']
        }),
        uploadAvatar: build.mutation<any, File>({
            query: (payload: File) => ({
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
