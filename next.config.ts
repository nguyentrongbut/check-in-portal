import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    /* config options here */
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.vietqr.io',
                port: '',
                pathname: '/image/**',
            }
        ],

        unoptimized: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '50mb',
        },
    },
};

export default nextConfig;
