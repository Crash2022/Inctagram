import { PostUpdate } from '@/components/PostModal/PostMain/PostUpdate/PostUpdate'
import { PostContent } from '@/components/PostModal/PostMain/PostContent/PostContent'
import { useState } from 'react'

export const PostMain = () => {
    const [update, setUpdate] = useState<boolean>(false)

    if (update) {
        return <PostUpdate setUpdate={setUpdate} />
    } else {
        return <PostContent setUpdate={setUpdate} />
    }
}
