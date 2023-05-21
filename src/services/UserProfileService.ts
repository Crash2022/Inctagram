import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Photo, Profile} from '@/models/profile-types'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://inctagram-api-git-main-shuliakleonid.vercel.app/api',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
            return headers;
        }
    }),
    tagTypes: ['Profile/photos'],
    endpoints: (build) => ({
        fetchUserProfile: build.query<Profile>({
            query: () => ({
                url: 'users/profile',

            }),
            providesTags: ['Profile/photos']
        }),
        uploadPhoto: build.mutation<Photo, File>({
            query: (file) => {
                let formData = new FormData();
                formData.append('file', file);

                return {
                    url: 'users/profile/avatar',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Profile/photos']
        }),
    })
})

export const { useFetchUserProfileQuery, useUploadPhotoMutation} = userProfileAPI
