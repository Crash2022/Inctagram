import { PostUpdate } from '@/components/PostModal/PostMain/PostUpdate/PostUpdate'
import { PostContent } from '@/components/PostModal/PostMain/PostContent/PostContent'
import React, { useState } from 'react'
import { PostType } from '@/models/posts-types'
import { useGetUserPostByIdQuery, useGetUserPostsQuery } from '@/services/UserPostsService'
import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { selectorPostId } from '@/store/selectors'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

export const PostMain = () => {
    const [update, setUpdate] = useState<boolean>(false)
    const postId = useAppSelector(selectorPostId)
    const { data: post, error, isLoading: postIsLoading, isError } = useGetUserPostByIdQuery(postId)

    console.log(postId)

    if (postIsLoading) return <LoaderScreen variant={'circle'} />

    if (update) {
        return <PostUpdate setUpdate={setUpdate} post={post} />
    } else {
        return <PostContent setUpdate={setUpdate} post={post} />
    }
}
