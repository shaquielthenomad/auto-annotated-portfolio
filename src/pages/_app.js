import '../css/main.css';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        console.log('Wix Client ID:', process.env.WIX_CLIENT_ID);

        if (!process.env.WIX_CLIENT_ID) {
            console.error('WARNING: Wix Client ID is not set in environment variables');
        }
    }, []);

    return <Component {...pageProps} />;
}
