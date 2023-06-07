import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL,
    withCredentials: true
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    // }
})

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
    },
    async (error: any) => {
        return await Promise.reject(error)
    }
)
