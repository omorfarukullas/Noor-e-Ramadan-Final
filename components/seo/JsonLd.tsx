import React from 'react';

interface JsonLdProps {
    data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// Pre-defined Schemas
export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Noor e Ramadan',
    url: 'https://noor-e-ramadan-bd.vercel.app/',
    description: 'Your Digital Islamic Companion - Quran, Prayer Times, Hadith, Tasbih & more',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://noor-e-ramadan-bd.vercel.app/quran?q={search_term_string}',
        'query-input': 'required name=search_term_string'
    }
};

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Noor e Ramadan',
    url: 'https://noor-e-ramadan-bd.vercel.app/',
    logo: 'https://noor-e-ramadan-bd.vercel.app/icon-512x512.png',
    sameAs: []
};
