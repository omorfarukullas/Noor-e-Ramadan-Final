/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/everyayah\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'quran-audio-cache',
                expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
        },
        {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'supabase-cache',
                expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
            },
        },
        {
            urlPattern: /\/_next\/static\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'static-cache',
                expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
        },
    ],
});

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

module.exports = withPWA(nextConfig);
