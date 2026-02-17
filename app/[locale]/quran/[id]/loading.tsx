export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-6">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-xl p-8 mb-8">
                <div className="text-center mb-6">
                    <div className="h-12 bg-white/20 rounded w-64 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-10 bg-white/20 rounded w-48 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-6 bg-white/20 rounded w-72 mx-auto mb-4 animate-pulse"></div>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="h-8 bg-white/20 rounded-full w-24 animate-pulse"></div>
                        <div className="h-8 bg-white/20 rounded-full w-20 animate-pulse"></div>
                        <div className="h-8 bg-white/20 rounded-full w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Verses Skeleton */}
            <div className="max-w-4xl mx-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-100 dark:border-gray-700"
                    >
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 animate-pulse"></div>
                        <div className="space-y-3 mb-6">
                            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-16 bg-blue-100 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-16 bg-purple-100 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
