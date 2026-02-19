'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-50 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 max-w-sm w-full">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="text-red-500" size={32} />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Authentication Error</h1>
                <p className="text-gray-600 mb-6">
                    There was a problem signing you in. Please try again.
                </p>
                <Link
                    href="/login"
                    className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
