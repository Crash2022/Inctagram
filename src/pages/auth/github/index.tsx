import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGithubRegistrationMutation } from '@/services/AuthService'

const GithubCallbackPage = () => {
    const router = useRouter()
    const githubCode = router.query.code

    const [githubRegistration, { isSuccess, error, isError, isLoading }] = useGithubRegistrationMutation()

    useEffect(() => {
        if (githubCode) {
            githubRegistration({ githubCode: githubCode as string })
        }
    }, [githubCode])

    return isLoading
        ? <div>Loading...</div>
        : isSuccess
            ? <div>Successfully registered with GitHub. You may close this page.</div>
            : isError
                ? <div>Error: {error}</div>
                : null
}

export default GithubCallbackPage

