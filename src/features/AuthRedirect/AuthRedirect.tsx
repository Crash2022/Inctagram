import React, { useEffect } from 'react'
import { useMeQuery } from '@/services/AuthService'
import { useRouter } from 'next/router'
import { InctagramPath } from '@/shared/api/path'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

// вариант 1
// const AuthRedirect = ({ children }) => {
//     const router = useRouter()
//     const { data: meData } = useMeQuery()
//
//     useEffect(() => {
//         if (!meData) router.push(InctagramPath.AUTH.LOGIN).then()
//     }, [])
//
//     return <>{children}</>
// }

// вариант 2
// check if you are on the client (browser) or server
const isBrowser = () => typeof window !== 'undefined'

const AuthRedirect = ({ children }) => {
    const router = useRouter()
    const { data: meData, isLoading, isAuthenticated } = useMeQuery()

    let unprotectedRoutes = [
        InctagramPath.AUTH.LOGIN,
        InctagramPath.AUTH.REGISTRATION,
        InctagramPath.AUTH.FORGOT_PASSWORD,
        InctagramPath.AUTH.CONFIRM_REGISTRATION,
        InctagramPath.AUTH.CREATE_NEW_PASSWORD,
        InctagramPath.AUTH.INVALID_LINK,
        InctagramPath.AUTH.EXPIRED_LINK
    ]

    // let pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1
    let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1

    useEffect(() => {
        if (isBrowser() && !isLoading && !meData && pathIsProtected) {
            router.push(InctagramPath.AUTH.LOGIN).then()
        }
    }, [isLoading, meData, pathIsProtected])

    if ((isLoading || !meData) && pathIsProtected) {
        return <LoaderScreen variant={'loader'} />
    }

    return children
}

export default AuthRedirect

// import { appRoutes } from "../constants";
// import { useAuthContext } from "../contexts";
//
// //check if you are on the client (browser) or server
// const isBrowser = () => typeof window !== "undefined";
//
// const ProtectedRoute = ({ router, children }) => {
//     //Identify authenticated user
//     const { user } = useAuthContext();
//     const isAuthenticated = user.isLoggedIn;
//
//     let unprotectedRoutes = [
//         appRoutes.LOGIN_PAGE,
//         appRoutes.FORGOT_PASSWORD,
//         appRoutes.RESET_PASSWORD,
//         appRoutes.EMAIL_SENT,
//         appRoutes.VERIFY_EMAIL,
//         appRoutes.NEWS_FEED_PAGE,
//         appRoutes.CONTENT_DETAILS_PAGE,
//         appRoutes.ABOUT_US_PAGE,
//     ];
//
//     /**
//      * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
//      */
//     let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
//
//     if (isBrowser() && !isAuthenticated && pathIsProtected) {
//         router.push(appRoutes.LOGIN_PAGE);
//     }
//
//     return children;
// };
//
// export default ProtectedRoute;
