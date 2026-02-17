import Link from 'next/link';

export default function QuranNotFound() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12">
                    <div className="text-6xl mb-6">📖</div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Surah Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        The surah you're looking for doesn't exist. <br />
                        Please select a valid surah number (1-114).
                    </p>
                    <Link
                        href="/en/quran"
                        className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Surah List
                    </Link>
                </div>
            </div>
        </div>
    );
}
