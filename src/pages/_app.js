// src/pages/_app.js
import '../css/main.css';
import { useEffect } from 'react';
import Layout from '../components/layouts/Layout';

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Any global initialization
    }, []);

    // Remove the Layout wrapper
    return <Component {...pageProps} />;
}
