import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query/react'
import { serviceAuthAPI } from '@/services/AuthService'
import { Cookies } from 'react-cookie'
import { ACCESS_TOKEN } from '@/shared/api/constants'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include'
})
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery('/auth/update-tokens', api, extraOptions)

        const cookies = new Cookies()

        if (refreshResult.data.accessToken) {
            // store the new token
            // api.dispatch(tokenReceived(refreshResult.data))

            // localStorage.setItem('accessToken', refreshResult.data.accessToken)

            cookies.set(ACCESS_TOKEN, refreshResult.data.accessToken, { path: '/' })

            await serviceAuthAPI.endpoints.me()

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            // api.dispatch(logout())
            await serviceAuthAPI.endpoints.logout()
        }
    }
    return result
}
