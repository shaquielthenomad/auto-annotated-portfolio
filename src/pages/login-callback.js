import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { createClient, OAuthStrategy } from '@wix/sdk';

export default function LoginCallback() {
    const [nextPage, setNextPage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    async function verifyLogin() {
        if (typeof window === 'undefined') return;

        const data = localStorage.getItem('oauthRedirectData') ? JSON.parse(localStorage.getItem('oauthRedirectData')) : {};
        localStorage.removeItem('oauthRedirectData');

        const myWixClient = createClient({
            auth: OAuthStrategy({
                clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
                tokens: Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null
            })
        });

        try {
            const { code, state } = myWixClient.auth.parseFromUrl();
            let tokens = await myWixClient.auth.getMemberTokens(code, state, data);

            while (!tokens?.refreshToken?.value) {
                tokens = await myWixClient.auth.getMemberTokens(code, state, data);
            }

            Cookies.set('session', JSON.stringify(tokens));
            window.location.href = data?.originalUri || '/';
        } catch (e) {
            setNextPage(data?.originalUri || '/');
            setErrorMessage(e.toString());
        }
    }

    useEffect(() => {
        verifyLogin();
    }, []);

    return (
        <div className="login-callback container mx-auto p-4">
            {errorMessage && (
                <div className="text-red-500 mb-4">
                    <span>{errorMessage}</span>
                </div>
            )}
            {nextPage ? (
                <a href={nextPage} className="text-blue-500 hover:underline">
                    Continue
                </a>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
