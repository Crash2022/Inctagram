import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (file: any) => ({
                url: '/posts/image',
                method: 'POST',
                body: file,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
        createPost: builder.mutation({
            query: ({ imageUrl, description }: { imageUrl: string; description: string }) => ({
                url: '/posts',
                method: 'POST',
                body: {
                    imageUrl,
                    description,
                },
            }),
        }),
    }),
});

export const { useUploadImageMutation, useCreatePostMutation } = apiSlice;
