import { instance_JSON_Placeholder } from '@/shared/api/api-instance'
import { Photo } from '@/models/profile-types'

export const profileApi = {
    getProfilePhotos: async () => {
        return await instance_JSON_Placeholder
            .get<Photo[]>('photos?_limit=12', {})
            .then((res) => res.data)
    }
}
