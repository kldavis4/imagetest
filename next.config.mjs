/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [1024, 2048],
        domains: ['api.armenia.travel', 'cdn.sanity.io', 'www.campervannorway.com'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'api.armenia.travel',
            pathname: 'storage/*'
        },
        {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            pathname: 'images/*'
        },
        {
            protocol: 'https',
            hostname: 'www.campervannorway.com',
            pathname: 'assets/*'
        }]
    }
};

export default nextConfig;
