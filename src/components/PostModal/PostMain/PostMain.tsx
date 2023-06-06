import { PostUpdate } from '@/components/PostModal/PostMain/PostUpdate/PostUpdate'
import { PostContent } from '@/components/PostModal/PostMain/PostContent/PostContent'
import { useState } from 'react'
import { PostType } from '@/models/posts-types'

interface PostMainProps {
    post: PostType
}
export const PostMain = ({ post }: PostMainProps) => {
    const [update, setUpdate] = useState<boolean>(false)

    if (update) {
        return <PostUpdate setUpdate={setUpdate} />
    } else {
        return <PostContent setUpdate={setUpdate} post={post} />
    }
}
