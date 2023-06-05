import axios from 'axios'

// export const getToken = () => localStorage.getItem('accessToken')
// export const getAuthorizationHeader = () => `Bearer ${getToken()}`

export const instance = axios.create({
    baseURL: process.env.BASE_URL,
    // baseURL: process.env.NEXT_APP_BASE_URL,
    withCredentials: true
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    // }

    // headers: {
    //     Authorization: getAuthorizationHeader()
    // }
})

// export const getToken = () => localStorage.getItem("token")
//     ? JSON.parse(localStorage.getItem("token"))
//     : null
//
// export const getAuthorizationHeader = () => `Bearer ${getToken()}`
//
// export const axiosInstance = axios.create({
//     baseURL,
//     headers: { Authorization: getAuthorizationHeader() },
// })
