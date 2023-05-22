import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Photo } from '@/models/profile-types'

export const userProfilePhotosAPI = createApi({
    reducerPath: 'userProfilePhotosAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (build) => ({
        fetchUserProfilePhotos: build.query<Photo, number>({
            query: (limit: number = 6) => ({
                url: 'photos',
                params: {
                    _limit: limit
                }
            })
        })
    })
})

export const { useFetchUserProfilePhotosQuery } = userProfilePhotosAPI
