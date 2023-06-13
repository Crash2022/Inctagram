import axios from 'axios'
// import { useCookies } from 'react-cookie'
// import { cookies } from 'next/headers'
import { Cookies } from 'react-cookie'

export const instance = axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL,
    withCredentials: true
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    // }

    // headers: {
    //     Authorization: `Bearer process.env.ACCESS_TOKEN`
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

// instance.interceptors.request.use(
//     (config) => {
//         // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
//
//         const cookies = new Cookies()
//         const accessToken = cookies.get('accessToken')
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`
//         }
//         return config
//     },
//     async (error: any) => {
//         return await Promise.reject(error)
//     }
// )

// instance.interceptors.request.use(
//     (config) => {
//         config.headers.Authorization = process.env.ACCESS_TOKEN
//         return config
//     },
//     async (error: any) => {
//         return await Promise.reject(error)
//     }
// )
