import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Photo } from '@/models/profile-types'

export const userProfilePhotoAPI = createApi({
    reducerPath: 'userProfilePhotoAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (build) => ({
        fetchUserProfile: build.query<Photo, number>({
            query: (limit: number = 10) => ({
                url: 'photos',
                params: {
                    _limit: limit
                }
            })
        })
    })
})

export const { useFetchUserProfilePhotoQuery } = userProfilePhotoAPI
