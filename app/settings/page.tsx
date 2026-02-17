'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        location: 'Dhaka, Bangladesh',
        calculationMethod: 'Karachi',
        notifications: false,
        language: 'English',
        theme: 'Light',
    });

    const calculationMethods = [
        'Karachi',
        'ISNA',
        'Muslim World League',
        'Umm Al-Qura',
        'Egyptian',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-block text-green-600 hover:text-green-700 mb-4">
                        ← Back to Home
                    </a>
                    <div className="text-5xl mb-4">⚙️</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Settings
                    </h1>
                    <p className="text-gray-600">
                        Customize your app preferences
                    </p>
                </div>

                {/* Prayer Times Settings */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>🕌</span>
                        <span>Prayer Times</span>
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Default Location
                            </label>
                            <input
                                type="text"
                                value={settings.location}
                                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                placeholder="City, Country"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Calculation Method
                            </label>
                            <select
                                value={settings.calculationMethod}
                                onChange={(e) => setSettings({ ...settings, calculationMethod: e.target.value })}
                                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                            >
                                {calculationMethods.map(method => (
                                    <option key={method} value={method}>{method}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div>
                                <p className="font-semibold text-gray-800">Prayer Notifications</p>
                                <p className="text-sm text-gray-600">Get notified before each prayer</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                                className={`w-14 h-8 rounded-full transition-colors ${settings.notifications ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${settings.notifications ? 'translate-x-7' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* App Settings */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>📱</span>
                        <span>App Settings</span>
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Language
                            </label>
                            <select
                                value={settings.language}
                                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                            >
                                <option value="English">English</option>
                                <option value="Bangla">বাংলা (Bangla)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Full bilingual support coming soon
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Theme
                            </label>
                            <select
                                value={settings.theme}
                                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                            >
                                <option value="Light">Light Mode</option>
                                <option value="Dark">Dark Mode (Coming Soon)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>ℹ️</span>
                        <span>About</span>
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold">App Name</span>
                            <span>Noor e Ramadan</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold">Version</span>
                            <span>1.0.0</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-semibold">Features</span>
                            <span>8 Core Features</span>
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>💾</span>
                        <span>Data Management</span>
                    </h3>
                    <div className="space-y-3">
                        <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg border-2 border-blue-200 transition-colors">
                            📤 Export My Data
                        </button>
                        <button className="w-full p-4 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-lg border-2 border-green-200 transition-colors">
                            ☁️ Sync with Cloud (Coming Soon)
                        </button>
                        <button className="w-full p-4 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg border-2 border-red-200 transition-colors">
                            🗑️ Clear All Data
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                    <button className="w-full p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl shadow-lg transition-all">
                        💾 Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
