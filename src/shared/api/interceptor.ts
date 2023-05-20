import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query/react'
import { baseURL } from '@/shared/api/baseURL'
import { serviceAuthAPI } from '@/services/AuthService'

const baseQuery = fetchBaseQuery({ baseUrl: baseURL })
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery('/auth/update-tokens', api, extraOptions)
        if (refreshResult.data.accessToken) {
            // if (refreshResult.data) {
            // store the new token
            // api.dispatch(tokenReceived(refreshResult.data))

            localStorage.setItem('accessToken', refreshResult.data.accessToken)
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
