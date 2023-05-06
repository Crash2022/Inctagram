import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Photo } from '@/models/userProfileService-types'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
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

export const { useFetchUserProfileQuery } = userProfileAPI
