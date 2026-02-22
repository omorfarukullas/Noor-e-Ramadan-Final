import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/auth/'], // Keep API and auth routes out of search engines
        },
        sitemap: 'https://noor-e-ramadan-bd.vercel.app/sitemap.xml',
    };
}
