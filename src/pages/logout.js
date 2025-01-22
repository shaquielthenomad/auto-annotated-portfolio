// src/pages/logout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        // Remove session cookies
        Cookies.remove('session');

        // Clear local storage
        localStorage.removeItem('oauthRedirectData');

        // Redirect to home page
        router.push('/');
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center">
                <p className="text-xl text-gray-600">Logging out...</p>
                <div className="animate-pulse mt-4">
                    <div className="h-4 bg-blue-400 rounded w-32 mx-auto"></div>
                </div>
            </div>
        </div>
    );
}
