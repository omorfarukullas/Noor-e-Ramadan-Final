import { MetadataRoute } from 'next';

const DOMAIN = 'https://noor-e-ramadan-bd.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${DOMAIN}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${DOMAIN}/ramadan`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${DOMAIN}/prayer-times`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${DOMAIN}/namaz`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${DOMAIN}/qibla`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${DOMAIN}/quran`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${DOMAIN}/hadith`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${DOMAIN}/dhikr`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        {
            url: `${DOMAIN}/duas`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${DOMAIN}/tracker`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        }
    ];
}
