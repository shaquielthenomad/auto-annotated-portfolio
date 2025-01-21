import '../css/main.css';
import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        console.log('Wix Environment Variables:', {
            CLIENT_ID: process.env.WIX_CLIENT_ID,
            API_KEY: process.env.WIX_API_KEY ? 'Present' : 'Missing',
            SITE_ID: process.env.WIX_SITE_ID,
            ACCOUNT_ID: process.env.WIX_ACCOUNT_ID
        });
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
