import { instance } from '@/shared/api/api-instance'
import { GetPostsResponse } from '@/shared/types/posts-types'
import { UserProfile } from '@/shared/types/profile-types'

export const profileApi = {
    getUserProfileData: async () => {
        return await instance.get<UserProfile>('/users/profile', {}).then((res) => res.data)
    },
    getUserProfilePosts: async (userId: number) => {
        return await instance.get<GetPostsResponse>(`/posts/${userId}`, {}).then((res) => res.data)
    }
}
