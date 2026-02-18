'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        location: '',
        method: '1',
        madhab: '1',
        notifications: false,
        language: 'Bangla',
        theme: 'Light',
    });
    const [message, setMessage] = useState<string | null>(null);

    // Load settings on mount
    useEffect(() => {
        const savedLocation = localStorage.getItem('settings_location') || '';
        const savedMethod = localStorage.getItem('settings_method') || '1';
        const savedMadhab = localStorage.getItem('settings_madhab') || '1';
        const savedNotifications = localStorage.getItem('settings_notifications') === 'true';
        const savedLanguage = localStorage.getItem('settings_language') || 'Bangla';
        const savedTheme = localStorage.getItem('settings_theme') || 'Light';

        setSettings({
            location: savedLocation,
            method: savedMethod,
            madhab: savedMadhab,
            notifications: savedNotifications,
            language: savedLanguage,
            theme: savedTheme,
        });
    }, []);

    const calculationMethods = [
        { id: '1', name: 'Karachi (University of Islamic Sciences)' },
        { id: '2', name: 'ISNA (Islamic Society of North America)' },
        { id: '3', name: 'Muslim World League' },
        { id: '4', name: 'Umm Al-Qura University, Makkah' },
        { id: '5', name: 'Egyptian General Authority of Survey' },
    ];

    const madhabs = [
        { id: '1', name: 'Hanafi (Standard)' },
        { id: '0', name: 'Shafi (Standard)' },
    ];

    const saveSettings = () => {
        localStorage.setItem('settings_location', settings.location);
        localStorage.setItem('settings_method', settings.method);
        localStorage.setItem('settings_madhab', settings.madhab);
        localStorage.setItem('settings_notifications', String(settings.notifications));
        localStorage.setItem('settings_language', settings.language);
        localStorage.setItem('settings_theme', settings.theme);

        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
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
                                Location Preference
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={settings.location}
                                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                    className="flex-1 p-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    placeholder="Enter city manually..."
                                />
                                <button
                                    onClick={() => {
                                        setSettings({ ...settings, location: '' });
                                        setMessage('Location set to Auto-Detect (GPS)');
                                        setTimeout(() => setMessage(null), 3000);
                                    }}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 font-medium"
                                    title="Use Current Location"
                                >
                                    <span>📍</span>
                                    <span className="hidden sm:inline">Auto (GPS)</span>
                                </button>
                            </div>
                            <p className={`text-xs mt-2 font-medium ${settings.location ? 'text-amber-600' : 'text-green-600'}`}>
                                {settings.location
                                    ? '⚠️ Using manual location. Clear or click Auto to use GPS.'
                                    : '✅ GPS Auto-detection enabled'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Calculation Method
                            </label>
                            <select
                                value={settings.method}
                                onChange={(e) => setSettings({ ...settings, method: e.target.value })}
                                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                            >
                                {calculationMethods.map(method => (
                                    <option key={method.id} value={method.id}>{method.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Juristic Method (Madhab)
                            </label>
                            <select
                                value={settings.madhab}
                                onChange={(e) => setSettings({ ...settings, madhab: e.target.value })}
                                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                            >
                                {madhabs.map(madhab => (
                                    <option key={madhab.id} value={madhab.id}>{madhab.name}</option>
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
                                <option value="Bangla">বাংলা (Bangla)</option>
                                <option value="English">English</option>
                            </select>
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
                                <option value="Dark">Dark Mode</option>
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
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                    <button
                        onClick={saveSettings}
                        className="w-full p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl shadow-lg transition-all"
                    >
                        💾 Save Settings
                    </button>
                </div>

                {/* Toast */}
                {message && (
                    <div className="fixed bottom-4 right-4 bg-black/80 text-white px-6 py-3 rounded-full animate-fade-in-up">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
