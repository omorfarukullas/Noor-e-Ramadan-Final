/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['everyayah.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.openstreetmap.org',
            },
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

module.exports = nextConfig;
