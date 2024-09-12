/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [1024, 2048],
        domains: ['api.armenia.travel', 'cdn.sanity.io', 'www.campervannorway.com', 'cdn.sanity.io', 'en.wikipedia.org'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'api.armenia.travel',
            pathname: '/storage/**'
        },
        {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            pathname: '/images/**'
        },
        {
            protocol: 'https',
            hostname: 'www.campervannorway.com',
            pathname: '/assets/**'
        }]
    },
    rewrites: async () => {
        return [
            {
                source: '/api/foobar/:path*',
                destination: 'https://resolutesportfencing.com/home/'
            }
        ];
    }
};

export default nextConfig;
