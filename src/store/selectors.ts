import { RootState } from '@/store/store'

export const selectorIsLoading = (state: RootState) => state.app.isLoading
export const selectorPost = (state: RootState) => state.post

export const selectorPostId = (state: RootState) => state.post.postId
