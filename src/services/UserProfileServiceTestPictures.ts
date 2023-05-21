import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Photo, UserProfile } from '@/models/profile-types'
import { MeResponseType } from '@/models/auth-types'

export const userProfileAPITest = createApi({
    reducerPath: 'userProfileAPITest',
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

export const { useFetchUserProfileQuery } = userProfileAPITest
