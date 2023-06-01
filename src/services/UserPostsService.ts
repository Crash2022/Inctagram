import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '@/shared/api/baseURL'
import { GetPostsResponse, AddPostsResponse } from '@/models/posts-types'

export const userPostsAPI = createApi({
    reducerPath: 'userPostsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            return headers
        }
    }),
    tagTypes: ['UserPosts'],
    endpoints: (build) => ({
        getUserPostById: build.query<AddPostsResponse, any>({
            query: (postId: number) => ({
                url: `/user/posts/p/${postId}`
            }),
            providesTags: (result) => ['UserPosts']
        }),
        getUserPosts: build.query<GetPostsResponse, any>({
            query: (userId: number) => ({
                url: `/user/posts/${userId}`
            }),
            providesTags: (result) => ['UserPosts']
        }),
        createPost: build.mutation<any, { description: string }>({
            query: (payload: { description: string }) => ({
                url: `/user/posts`,
                method: 'POST',
                body: payload
            })
        }),
        uploadImageToPost: build.mutation<any, FormData>({
            query: (payload: FormData) => ({
                url: `/user/posts/image`,
                method: 'POST',
                body: payload
            })
        }),
        deletePost: build.mutation<any, any>({
            query: (postId: number) => ({
                url: `/user/posts/${postId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['UserPosts']
        })
        // надо исправить
        // updatePost: build.mutation<any, any>({
        //     query: (payload: { description: string }) => ({
        //         url: `/user/posts/${postId}`,
        //         method: 'PUT',
        //         body: payload
        //     })
        // })
    })
})

export const {
    useGetUserPostByIdQuery,
    useGetUserPostsQuery,
    useCreatePostMutation,
    useUploadImageToPostMutation,
    useDeletePostMutation
    // useUpdatePostMutation
} = userPostsAPI
