import NamazContainer from '@/components/namaz/NamazContainer';

export const metadata = {
    title: 'নামাজ শিক্ষা | নূর-ই-রমজান',
    description: 'সহজ বাংলা ভাষায় নামাজ ও অযুর পূর্ণাঙ্গ নিয়মাবলী',
};

export default function NamazPage() {
    return (
        <main className="min-h-screen bg-emerald-50/30 pb-20">
            {/* Header */}
            <div className="bg-emerald-600 text-white pt-8 pb-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">নামাজ শিক্ষা</h1>
                    </div>
                    <p className="text-emerald-100 text-lg opacity-90 max-w-2xl">
                        সহীহ ভাবে নামাজ আদায়ের জন্য প্রয়োজনীয় সকল মাসায়েল, দোয়া ও নিয়মাবলী এক সাথে।
                    </p>
                </div>
            </div>

            {/* Content - Pull up overlap */}
            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
                <NamazContainer />
            </div>
        </main>
    );
}
