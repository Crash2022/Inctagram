import { PostUpdate } from '@/components/PostModal/PostMain/PostUpdate/PostUpdate'
import { PostContent } from '@/components/PostModal/PostMain/PostContent/PostContent'
import React, { useState } from 'react'
import { useGetUserPostByIdQuery } from '@/services/UserPostsService'
import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { selectorPostId } from '@/store/selectors'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

interface PostMainProps {
    setOpenPostModal: (value: boolean) => void
}

export const PostMain = ({ setOpenPostModal }: PostMainProps) => {
    const postId = useAppSelector(selectorPostId)
    const [update, setUpdate] = useState<boolean>(false)
    const { data: post, isLoading: postIsLoading } = useGetUserPostByIdQuery(postId)

    if (postIsLoading) return <LoaderScreen variant={'circle'} />

    if (update) {
        return <PostUpdate setUpdate={setUpdate} post={post} />
    } else {
        return <PostContent setUpdate={setUpdate} setOpenPostModal={setOpenPostModal} post={post} />
    }
}
