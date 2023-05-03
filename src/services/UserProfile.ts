import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({ baseURL: `https://jsonplaceholder.typicode.com/` }),
    endpoints: (build) => ({
        fetchUserProfile: build.query<User[], void>({
            query: () => '/posts'
        })
    })
})

type User = {
    userId: number
    id: number
    title: string
    body: string
}

export const { useFetchUserProfileQuery } = userProfileAPI
