import Link from 'next/link';

// Feature data structure with names and routes
const features = [
    { icon: "🕌", title: "নামাজের সময়সূচী", route: "/prayer-times" },
    { icon: "📖", title: "আল-কুরআন", route: "/quran" },
    { icon: "📚", title: "হাদিস শরীফ", route: "/hadith" },
    { icon: "🗺️", title: "মসজিদ খুঁজুন", route: "/mosques" },
    { icon: "🤲", title: "দোয়া ভাণ্ডার", route: "/duas" },
    { icon: "📊", title: "আমল ট্র্যাকার", route: "/tracker" },
    { icon: "📿", title: "ডিজিটাল তসবিহ", route: "/dhikr" },
    { icon: "🙏", title: "নামাজ শিক্ষা", route: "/namaz" },
    { icon: "📅", title: "হিজরি ক্যালেন্ডার", route: "/calendar" },
    { icon: "🌙", title: "রমজান ক্যালেন্ডার", route: "/ramadan" },
    { icon: "🧭", title: "কিবলা কম্পাস", route: "/qibla" },
];

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">🌙</div>
                    <h1 className="text-5xl font-bold text-green-700 mb-2">
                        নূর এ রমজান
                    </h1>
                    <p className="text-2xl text-green-600 font-arabic mb-2">
                        نور رمضان
                    </p>
                    <p className="text-xl text-gray-600">
                        আপনার ডিজিটাল দ্বীনি সঙ্গী
                    </p>
                </div>

                {/* Welcome */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                        আসসালামু আলাইকুম! 🤲
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        নূর এ রমজান - এ আপনাকে স্বাগতম
                    </p>

                    {/* Features */}
                    <div className="grid md:grid-cols-2 gap-4 mt-8">
                        {features.map((feature) => (
                            <FeatureBox key={feature.title} {...feature} />
                        ))}
                    </div>
                </div>

                {/* Footer/Status */}
                <div className="bg-green-600 text-white rounded-xl p-6 text-center">
                    <p className="text-2xl font-bold mb-2">আলহামদুলিল্লাহ!</p>
                    <p className="text-green-100 mb-3">
                        সকল ফিচার এখন প্রস্তুত
                    </p>
                    <Link
                        href="/settings"
                        className="inline-block bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                    >
                        ⚙️ সেটিংস
                    </Link>
                </div>
            </div>
        </main>
    );
}

function FeatureBox({ icon, title, route }: { icon: string; title: string; route: string }) {
    const content = (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-3xl">{icon}</span>
                <span className="font-semibold text-gray-800">{title}</span>
            </div>
        </div>
    );

    return (
        <Link
            href={route}
            className="block bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-300 hover:border-green-500 hover:shadow-lg transition-all cursor-pointer"
        >
            {content}
        </Link>
    );
}
