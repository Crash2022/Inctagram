import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (build) => ({
        fetchUserProfile: build.query({
            query: (limit: number = 10) => ({
                url: 'posts',
                params: {
                    _limit: limit
                }
            })
        })
    })
})

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

export const { useFetchUserProfileQuery } = userProfileAPI
