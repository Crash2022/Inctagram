import axios from 'axios'
import { Cookies } from 'react-cookie'
import { ACCESS_TOKEN } from '@/shared/api/constants'

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true
    // headers: {
    // Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    // }

    // headers: {
    //     // if localStorage is not defined, it wont throw error
    //     Authorization:
    //         localStorage && localStorage.getItem('access_token')
    //             ? // ? 'Bearer ' + localStorage.getItem('access_token')
    //               `Bearer ${localStorage.getItem('accessToken')}`
    //             : null,
    //     'Content-Type': 'application/json',
    //     accept: 'application/json'
    // }
})

instance.interceptors.request.use(
    (config) => {
        // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

        const cookies = new Cookies()
        const accessToken = cookies.get(ACCESS_TOKEN)
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    async (error: any) => {
        return await Promise.reject(error)
    }
)
