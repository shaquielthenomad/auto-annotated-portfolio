/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW,
        WIX_CLIENT_ID: process.env.WIX_CLIENT_ID
    },
    trailingSlash: true,
    reactStrictMode: true
};

module.exports = nextConfig;
