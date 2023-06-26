import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGoogleRegistrationMutation, useRegistrationResendLinkMutation } from '@/services/AuthService';

const GoogleCallbackPage = () => {
    const router = useRouter();
    const googleCode = router.query.code;

    const [googleRegistration, { isSuccess, data: googleRegistrationData }] = useGoogleRegistrationMutation();
    const [resendRegistrationEmail] = useRegistrationResendLinkMutation();

    useEffect(() => {
        if (googleCode) {
            googleRegistration(googleCode as string);
        }
    }, [googleCode]);

    useEffect(() => {
        if (isSuccess && googleRegistrationData) {
            resendRegistrationEmail({ email: googleRegistrationData.email });
        }
    }, [isSuccess, googleRegistrationData]);

    return (
        <div>
            {isSuccess ? 'Successfully registered with Google. Check your email for confirmation.' : 'Loading...'}
        </div>
    );
};

export default GoogleCallbackPage;
