import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '@/shared/api/baseURL'
import { GetPostsResponse, PostType, UploadPostImage, CreatePost } from '@/models/posts-types'

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
        getUserPosts: build.query<GetPostsResponse, number>({
            query: (userId: number) => ({
                url: `/posts/${userId}`
            }),
            providesTags: (result) => ['UserPosts']
        }),
        getUserPostById: build.query<PostType, number>({
            query: (postId: number) => ({
                url: `/posts/p/${postId}`
            }),
            providesTags: (result) => ['UserPosts']
        }),
        createPost: build.mutation<PostType, CreatePost>({
            query: (payload: CreatePost) => ({
                url: '/posts',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['UserPosts']
        }),
        uploadImageToPost: build.mutation<UploadPostImage, FormData>({
            query: (payload: FormData) => ({
                url: '/posts/image',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['UserPosts']
        }),
        deletePost: build.mutation<any, number>({
            query: (postId: number) => ({
                url: `/posts/${postId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['UserPosts']
        }),
        deletePostImage: build.mutation<any, string>({
            query: (uploadId: string) => ({
                url: `/posts/image/${uploadId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['UserPosts']
        }),
        updatePost: build.mutation<any, { description: string; postId: number }>({
            query: (payload: { description: string; postId: number }) => ({
                url: `/user/posts/${payload.postId}`,
                method: 'PUT',
                body: payload.description
            }),
            invalidatesTags: ['UserPosts']
        })
    })
})

export const {
    useGetUserPostsQuery,
    useGetUserPostByIdQuery,
    useCreatePostMutation,
    useUploadImageToPostMutation,
    useDeletePostMutation,
    useDeletePostImageMutation,
    useUpdatePostMutation
} = userPostsAPI
