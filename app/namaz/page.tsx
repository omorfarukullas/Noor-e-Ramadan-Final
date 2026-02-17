import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function NamazPage() {
    // Fetch namaz steps from database
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: namazSteps, error } = await supabase
        .from('namaz_steps')
        .select('*')
        .order('step_number', { ascending: true });

    // Group steps by prayer type
    const wuduSteps = namazSteps?.filter(step => step.prayer_type === 'Wudu') || [];
    const fajrSteps = namazSteps?.filter(step => step.prayer_type === 'Fajr') || [];

    const prayers = [
        { name: 'Fajr', rakats: 2, time: 'Before sunrise', icon: '🌅' },
        { name: 'Dhuhr', rakats: 4, time: 'After midday', icon: '☀️' },
        { name: 'Asr', rakats: 4, time: 'Late afternoon', icon: '🌤️' },
        { name: 'Maghrib', rakats: 3, time: 'After sunset', icon: '🌆' },
        { name: 'Isha', rakats: 4, time: 'Night', icon: '🌙' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-block text-green-600 hover:text-green-700 mb-4">
                        ← Back to Home
                    </a>
                    <div className="text-5xl mb-4">🙏</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Namaz Guide
                    </h1>
                    <p className="text-gray-600">
                        Learn how to perform Salah step-by-step
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 rounded-xl p-4 mb-6">
                        <p className="font-semibold">Error loading namaz steps</p>
                        <p className="text-sm">{error.message}</p>
                    </div>
                )}

                {/* Prayer Times Overview */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        5 Daily Prayers
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {prayers.map((prayer) => (
                            <div
                                key={prayer.name}
                                className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-200"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{prayer.icon}</span>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{prayer.name}</h4>
                                        <p className="text-sm text-gray-600">{prayer.time}</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-green-100">
                                    <p className="text-green-700 font-semibold">
                                        {prayer.rakats} Rakat{prayer.rakats > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wudu Guide */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>💧</span>
                        <span>How to Perform Wudu (Ablution)</span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Wudu must be performed before prayer. Follow these {wuduSteps.length} steps:
                    </p>

                    {wuduSteps.length > 0 ? (
                        <div className="space-y-3">
                            {wuduSteps.map((step: any) => (
                                <div
                                    key={step.id}
                                    className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white border-2 border-blue-100"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                            {step.step_number}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 mb-1">{step.title_english}</h4>
                                            {step.arabic_text && (
                                                <p className="text-blue-700 font-arabic text-xl mb-2 leading-loose">
                                                    {step.arabic_text}
                                                </p>
                                            )}
                                            {step.english_transliteration && (
                                                <p className="text-sm italic text-gray-600 mb-1">
                                                    {step.english_transliteration}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-700">{step.description_english}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-4">No wudu steps found. Please import seed data.</p>
                    )}
                </div>

                {/* Fajr Prayer Steps */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>🕌</span>
                        <span>How to Perform Fajr Prayer</span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Follow these {fajrSteps.length} steps for Fajr (2 rakats):
                    </p>

                    {fajrSteps.length > 0 ? (
                        <div className="space-y-3">
                            {fajrSteps.map((step: any) => (
                                <div
                                    key={step.id}
                                    className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-white border-2 border-green-100"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                            {step.step_number}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 mb-1">{step.title_english}</h4>
                                            {step.arabic_text && (
                                                <p className="text-green-700 font-arabic text-xl mb-2 leading-loose">
                                                    {step.arabic_text}
                                                </p>
                                            )}
                                            {step.english_transliteration && (
                                                <p className="text-sm italic text-gray-600 mb-1">
                                                    {step.english_transliteration}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-700">{step.description_english}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-4">No prayer steps found. Please import seed data.</p>
                    )}
                </div>

                {/* Important Notes */}
                <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span>💡</span>
                        <span>Important Notes</span>
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>Always face the Qibla (direction of Kaaba in Makkah)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>Perform Wudu before every prayer</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>Pray at the designated times for each prayer</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>Men should pray in congregation at the mosque when possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>Women can pray at home or at the mosque</span>
                        </li>
                    </ul>
                </div>

                {/* Coming Features */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 p-4 rounded-xl text-center border-2 border-purple-200">
                        <div className="text-3xl mb-2">📸</div>
                        <p className="text-sm font-semibold text-gray-700">Illustrated Guide</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center border-2 border-blue-200">
                        <div className="text-3xl mb-2">🔊</div>
                        <p className="text-sm font-semibold text-gray-700">Audio Instructions</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-xl text-center border-2 border-pink-200">
                        <div className="text-3xl mb-2">🎥</div>
                        <p className="text-sm font-semibold text-gray-700">Video Tutorials</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
