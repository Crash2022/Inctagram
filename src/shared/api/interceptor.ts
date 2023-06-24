import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query/react'
import { serviceAuthAPI } from '@/services/AuthService'

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

        // @ts-expect-error
        if (refreshResult.data.accessToken) {
            // if (refreshResult.data) {
            // store the new token
            // api.dispatch(tokenReceived(refreshResult.data))

            // @ts-expect-error
            localStorage.setItem('accessToken', refreshResult.data.accessToken)
            // @ts-expect-error
            await serviceAuthAPI.endpoints.me()

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            // api.dispatch(logout())
            // @ts-expect-error
            await serviceAuthAPI.endpoints.logout()
        }
    }
    return result
}
