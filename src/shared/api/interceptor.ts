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

        // @ts-expect-error Ignore as refreshResult.data can be null/undefined
        if (refreshResult.data.accessToken) {

            // @ts-expect-error Ignore as refreshResult.data can be null/undefined
            localStorage.setItem('accessToken', refreshResult.data.accessToken)

            // @ts-expect-error Ignore as method 'me' might not exist on 'serviceAuthAPI.endpoints'
            await serviceAuthAPI.endpoints.me()

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            // @ts-expect-error Ignore as method 'logout' might not exist on 'serviceAuthAPI.endpoints'
            await serviceAuthAPI.endpoints.logout()
        }
    }
    return result
}
