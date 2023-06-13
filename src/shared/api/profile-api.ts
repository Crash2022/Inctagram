import { instance } from '@/shared/api/api-instance'
import { GetPostsResponse } from '@/models/posts-types'
import { UserProfile } from '@/models/profile-types'

export const profileApi = {
    getUserProfileData: async () => {
        return await instance.get<UserProfile>('/users/profile', {}).then((res) => res.data)
    },
    getUserProfilePosts: async (userId: number): Promise<any> => {
        return await instance.get<GetPostsResponse>(`/posts/${userId}`, {}).then((res) => res.data)
    }
}
