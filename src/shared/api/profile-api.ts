import { instance } from '@/shared/api/api-instance'
import { GetPostsResponse } from '@/models/posts-types'
import { UserProfile } from '@/models/profile-types'
import axios from 'axios'

export const profileApi = {
    getUserProfileData: async (token: string | undefined) => {
        return await axios
            .get<UserProfile>('/users/profile', {
                baseURL: process.env.NEXT_PUBLIC_BASE_URL,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => res.data)
    },
    getUserProfilePosts: async (userId: number): Promise<any> => {
        return await instance.get<GetPostsResponse>(`/posts/${userId}`, {}).then((res) => res.data)
    }
}
