import { PostUpdate } from '@/components/PostModal/PostMain/PostUpdate/PostUpdate'
import { PostContent } from '@/components/PostModal/PostMain/PostContent/PostContent'

interface PostMainType {
    update: boolean
    setUpdate: (update: boolean) => void
}
export const PostMain = ({ update, setUpdate }: PostMainType) => {
    if (update) {
        return <PostUpdate setUpdate={setUpdate} />
    } else {
        return <PostContent setUpdate={setUpdate} />
    }
}
