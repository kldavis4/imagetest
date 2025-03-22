/** @type {import('next').NextConfig} */

const mediaBaseUrl = process.env.MEDIA_BASE_URL || 'https://media.elkjop.com';
const useNextImageOptimization =
    process.env.USE_NEXT_IMAGE_OPTIMIZATION === "true";
const cmsServicePreviewUrl = process.env.BASE_URL_CMS_PREVIEW;
const cmsPreviewHostName = cmsServicePreviewUrl?.split("/")[2] ?? "";

const cmsRewrites = [
    {
        source: "/content/:path*",
        destination: `${mediaBaseUrl}/contentmedia/assets/:path*`,
    },
    {
        source: "/blueprint/:path*",
        destination: `https://${cmsPreviewHostName}/blueprint/:path*`,
    },
];

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
            ...cmsRewrites,
            {
                source: '/api/foobar/:path*',
                destination: 'https://resolutesportfencing.com/home/'
            },
            {
                source: '/api/fizzbo/:path*',
                destination: 'https://www.housewares.com/'
            }
        ];
    }
};

export default nextConfig;
