/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW,
        WIX_CLIENT_ID: process.env.WIX_CLIENT_ID,
        WIX_API_KEY: process.env.WIX_API_KEY,
        WIX_SITE_ID: process.env.WIX_SITE_ID,
        WIX_ACCOUNT_ID: process.env.WIX_ACCOUNT_ID
    },
    trailingSlash: true,
    reactStrictMode: true
};

module.exports = nextConfig;
