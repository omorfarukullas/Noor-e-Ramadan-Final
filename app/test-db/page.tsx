import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function TestSupabasePage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Test fetching from user_preferences table
    const { data: preferences, error } = await supabase
        .from('user_preferences')
        .select('*')
        .limit(5)

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <a href="/" className="inline-block text-green-600 hover:text-green-700 mb-4">
                        ← Back to Home
                    </a>
                    <div className="text-5xl mb-4">💾</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Supabase Connection Test
                    </h1>
                    <p className="text-gray-600">
                        Testing server-side data fetching
                    </p>
                </div>

                {/* Connection Status */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Connection Status
                    </h3>

                    {error ? (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">❌</span>
                                <h4 className="text-lg font-semibold text-red-800">Connection Failed</h4>
                            </div>
                            <p className="text-red-700 mb-2">Error: {error.message}</p>
                            <p className="text-sm text-red-600">
                                Make sure you've run the database schema in Supabase. Check DATABASE_SETUP.md for instructions.
                            </p>
                        </div>
                    ) : preferences && preferences.length > 0 ? (
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">✅</span>
                                <h4 className="text-lg font-semibold text-green-800">Connected Successfully!</h4>
                            </div>
                            <p className="text-green-700 mb-4">Found {preferences.length} user preference(s)</p>

                            <div className="bg-white rounded-lg p-4 border border-green-100">
                                <pre className="text-sm text-gray-700 overflow-auto">
                                    {JSON.stringify(preferences, null, 2)}
                                </pre>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">✅</span>
                                <h4 className="text-lg font-semibold text-blue-800">Connected (No Data Yet)</h4>
                            </div>
                            <p className="text-blue-700 mb-2">
                                Database connection successful, but no user preferences found.
                            </p>
                            <p className="text-sm text-blue-600">
                                This is normal for a fresh database. Data will appear when users create accounts and save preferences.
                            </p>
                        </div>
                    )}
                </div>

                {/* Environment Check */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Environment Variables
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-700">SUPABASE_URL</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-700">SUPABASE_PUBLISHABLE_DEFAULT_KEY</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? '✅ Set' : '❌ Missing'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="mt-6 bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span>💡</span>
                        <span>Next Steps</span>
                    </h3>
                    <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                        <li>Ensure .env.local has your Supabase credentials</li>
                        <li>Run the database schema (see DATABASE_SETUP.md)</li>
                        <li>Check this page to verify connection</li>
                        <li>Start using Supabase in your app!</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}
