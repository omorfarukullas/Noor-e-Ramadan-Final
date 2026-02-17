import { useTranslations } from 'next-intl';

export default function DuasPage() {
    const t = useTranslations('duas');

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {t('duas')}
            </h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                <div className="text-6xl mb-4">🤲</div>
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    150+ authentic duas for all occasions
                </p>
            </div>
        </div>
    );
}
