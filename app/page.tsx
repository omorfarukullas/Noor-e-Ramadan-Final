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
                        Your Digital Islamic Companion
                    </p>
                </div>

                {/* Welcome */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                        আসসালামু আলাইকুম! 🤲
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Welcome to Noor e Ramadan - Your comprehensive Islamic companion app
                    </p>

                    {/* Features */}
                    <div className="grid md:grid-cols-2 gap-4 mt-8">
                        <FeatureBox icon="🕌" title="Prayer Times" status="✅" />
                        <FeatureBox icon="📖" title="Digital Quran" status="✅" />
                        <FeatureBox icon="📚" title="Hadith Collection" status="✅" />
                        <FeatureBox icon="🗺️" title="Mosque Finder" status="✅" />
                        <FeatureBox icon="🤲" title="Duas Collection" status="✅" />
                        <FeatureBox icon="📊" title="Worship Tracker" status="✅" />
                        <FeatureBox icon="📿" title="Dhikr Counter" status="✅" />
                        <FeatureBox icon="🙏" title="Namaz Guide" status="✅" />
                        <FeatureBox icon="📅" title="Islamic Calendar" status="✅" />
                    </div>
                </div>

                {/* Status */}
                <div className="bg-green-600 text-white rounded-xl p-6 text-center">
                    <p className="text-2xl font-bold mb-2">✅ All Features Ready!</p>
                    <p className="text-green-100 mb-3">
                        8 core features implemented and working
                    </p>
                    <a
                        href="/settings"
                        className="inline-block bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                    >
                        ⚙️ Open Settings
                    </a>
                </div>
            </div>
        </main>
    );
}

function FeatureBox({ icon, title, status }: { icon: string; title: string; status: string }) {
    // Define which features are clickable and their routes
    const routes: { [key: string]: string } = {
        'Prayer Times': '/prayer-times',
        'Digital Quran': '/quran',
        'Hadith Collection': '/hadith',
        'Mosque Finder': '/mosques',
        'Duas Collection': '/duas',
        'Worship Tracker': '/tracker',
        'Dhikr Counter': '/dhikr',
        'Namaz Guide': '/namaz',
        'Islamic Calendar': '/calendar',
    };

    const isClickable = title in routes;
    const content = (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-3xl">{icon}</span>
                <span className="font-semibold text-gray-800">{title}</span>
            </div>
            <span className="text-2xl">{status}</span>
        </div>
    );

    if (isClickable) {
        return (
            <a
                href={routes[title]}
                className="block bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-300 hover:border-green-500 hover:shadow-lg transition-all cursor-pointer"
            >
                {content}
            </a>
        );
    }

    return (
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-md transition-all opacity-75">
            {content}
        </div>
    );
}
