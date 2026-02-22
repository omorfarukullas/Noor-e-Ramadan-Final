import React from 'react';
import QiblaCompass from '@/components/qibla/QiblaCompass';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'অনলাইন কিবলা কম্পাস | Find Qibla Direction Online',
    description: 'আপনার অবস্থান থেকে মক্কার (কিবলা) বা কাবার সঠিক দিক নির্ণয় করুন সহজে। Find accurate Qibla (Kaaba) direction from anywhere.',
    keywords: ['Qibla compass online', 'Find Qibla direction', 'Kaaba direction finder', 'Qibla locator', 'Mekka direction'],
};

export default function QiblaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pb-20">


            <main className="container mx-auto px-4 pt-24 max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-emerald-900 font-bengali mb-2">
                        কিবলা কম্পাস
                    </h1>
                    <p className="text-emerald-700 font-bengali">
                        আপনার অবস্থান থেকে মক্কার (কিবলা) সঠিক দিক নির্ণয় করুন
                    </p>
                </div>

                <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
                    <QiblaCompass />
                </div>

                <div className="mt-8 bg-white/60 backdrop-blur rounded-xl p-5 border border-white/50 space-y-3">
                    <h3 className="font-bold text-emerald-800 font-bengali text-lg">নির্দেশনা:</h3>
                    <ul className="list-disc list-inside text-emerald-700 text-sm font-bengali space-y-1">
                        <li>ভালো ফলাফলের জন্য ফোনের জিপিএস (GPS) চালু রাখুন।</li>
                        <li>ধাতব বস্তু বা চুম্বক থেকে ফোন দূরে রাখুন।</li>
                        <li>কম্পাস সঠিক না দেখালে ফোনটি হাতে নিয়ে ৮ (Eight) আকৃতিতে কয়েকবার ঘুরান।</li>
                        <li>সমতল জায়গায় ফোন রেখে ব্যবহার করলে সবচেয়ে ভালো ফলাফল পাওয়া যায়।</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
