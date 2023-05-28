import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true
})

// тестовый инстанс
export const instance_JSON_Placeholder = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true
})
