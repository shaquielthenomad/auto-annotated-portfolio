import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient, OAuthStrategy } from '@wix/sdk';

export default function LoginCallback() {
    const router = useRouter();
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

            let tokens;
            let attempts = 0;
            const maxAttempts = 3;

            while (attempts < maxAttempts) {
                try {
                    tokens = await myWixClient.auth.getMemberTokens(code, state, data);

                    if (tokens?.refreshToken?.value) {
                        break;
                    }
                } catch (retryError) {
                    attempts++;
                    await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempts) * 1000));
                }
            }

            if (!tokens?.refreshToken?.value) {
                throw new Error('Failed to retrieve authentication tokens');
            }

            Cookies.set('session', JSON.stringify(tokens), {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            router.push(data?.originalUri || '/');
        } catch (e) {
            console.error('Login verification error:', e);
            setNextPage(data?.originalUri || '/');
            setErrorMessage(e.toString());
        }
    }

    useEffect(() => {
        verifyLogin();
    }, []);

    return (
        <div className="login-callback container mx-auto p-4 min-h-screen flex items-center justify-center">
            <div className="text-center">
                {errorMessage ? (
                    <div className="mb-4">
                        <p className="text-red-500 text-lg mb-2">Login Error</p>
                        <p className="text-gray-600">{errorMessage}</p>
                        <a href={nextPage} className="mt-4 inline-block text-blue-500 hover:underline">
                            Continue to Home
                        </a>
                    </div>
                ) : (
                    <div className="animate-pulse">
                        <p className="text-gray-600">Verifying login...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
