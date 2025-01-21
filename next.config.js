/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        STACKBIT_PREVIEW: process.env.STACKBIT_PREVIEW
    },
    publicRuntimeConfig: {
        WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        WIX_API_KEY: process.env.NEXT_PUBLIC_WIX_API_KEY,
        WIX_SITE_ID: process.env.NEXT_PUBLIC_WIX_SITE_ID,
        WIX_ACCOUNT_ID: process.env.NEXT_PUBLIC_WIX_ACCOUNT_ID
    },
    trailingSlash: true,
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false
    }
};

module.exports = nextConfig;
