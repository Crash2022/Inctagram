import axios from 'axios'
import { Cookies } from 'react-cookie'
// import { useCookies } from 'react-cookie'
// import { cookies } from 'next/headers'

export const instance = axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        // Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk4LCJpYXQiOjE2ODY3NTk4MTgsImV4cCI6MTY4Njc2MzQxOH0.1fUnBcqlL8ExlKB7Wq5EIrNMNbsAoTm3xWg5K_eodGY`
    }

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
//         config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk4LCJpYXQiOjE2ODY3NTk4MTgsImV4cCI6MTY4Njc2MzQxOH0.1fUnBcqlL8ExlKB7Wq5EIrNMNbsAoTm3xWg5K_eodGY`
//         // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
//
//         // const cookies = new Cookies()
//         // const accessToken = cookies.get('accessToken')
//         // if (accessToken) {
//         //     config.headers.Authorization = `Bearer ${accessToken}`
//         // }
//         return config
//     },
//     async (error: any) => {
//         return await Promise.reject(error)
//     }
// )
