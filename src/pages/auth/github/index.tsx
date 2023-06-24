import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGithubRegistrationMutation, useRegistrationResendLinkMutation } from '@/services/AuthService';

const GithubCallbackPage = () => {
    const router = useRouter();
    const githubCode = router.query.code;

    const [githubRegistration, { isSuccess, data: githubRegistrationData }] = useGithubRegistrationMutation();
    const [resendRegistrationEmail] = useRegistrationResendLinkMutation();

    useEffect(() => {
        if (githubCode) {
            githubRegistration( githubCode as string);
        }
    }, [githubCode]);

    useEffect(() => {
        if (isSuccess && githubRegistrationData) {
            // Assuming the Github registration endpoint returns the user's email
            resendRegistrationEmail({ email: githubRegistrationData.email });
        }
    }, [isSuccess, githubRegistrationData]);

    return (
        <div>
            {isSuccess ? 'Successfully registered with GitHub. Check your email for confirmation.' : 'Loading...'}
        </div>
    );
};

export default GithubCallbackPage;

