// src/pages/login.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient, OAuthStrategy } from '@wix/sdk';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const initiateLogin = async () => {
            try {
                // Create Wix client with OAuth strategy
                const wixClient = createClient({
                    auth: OAuthStrategy({
                        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID
                    })
                });

                // Store the current page for redirect after login
                const currentPath = router.asPath;
                localStorage.setItem(
                    'oauthRedirectData',
                    JSON.stringify({
                        originalUri: currentPath || '/'
                    })
                );

                // Generate login URL
                const loginUrl = wixClient.auth.generateOAuthUrl({
                    redirectUri: `${window.location.origin}/login-callback`,
                    scope: ['offline', 'profile', 'email']
                });

                // Redirect to Wix login
                window.location.href = loginUrl;
            } catch (error) {
                console.error('Login initiation error:', error);
                // Handle login error
                router.push('/');
            }
        };

        // Only run on client-side
        if (typeof window !== 'undefined') {
            initiateLogin();
        }
    }, [router]);

    // Render a loading state while redirecting
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center">
                <p className="text-xl text-gray-600">Redirecting to login...</p>
                <div className="animate-pulse mt-4">
                    <div className="h-4 bg-blue-400 rounded w-32 mx-auto"></div>
                </div>
            </div>
        </div>
    );
}
