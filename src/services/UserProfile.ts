import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const userProfileAPI = createApi({
    reducerPath: 'userProfileAPI',
    baseQuery: fetchBaseQuery({ baseURL: 'https://jsonplaceholder.typicode.com/' })
    // endpoints: (build) => ({
    //     fetchUserProfile: build.query<any>({
    //         query: () => ({ url: '/photos' })
    //     })
    // })
})
