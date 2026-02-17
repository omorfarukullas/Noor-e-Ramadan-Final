export default function CalendarPage() {
    const islamicMonths = [
        'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
        'Ramadan', 'Shawwal', 'Dhul-Qadah', 'Dhul-Hijjah'
    ];

    const specialDays = [
        { name: 'Islamic New Year', month: 'Muharram', day: 1, icon: '🌙' },
        { name: 'Day of Ashura', month: 'Muharram', day: 10, icon: '🕌' },
        { name: 'Mawlid an-Nabi', month: 'Rabi al-Awwal', day: 12, icon: '💚' },
        { name: 'Lailat al-Miraj', month: 'Rajab', day: 27, icon: '⭐' },
        { name: 'Lailat al-Bara\'ah', month: 'Shaban', day: 15, icon: '🌟' },
        { name: 'First Day of Ramadan', month: 'Ramadan', day: 1, icon: '🌙' },
        { name: 'Lailat al-Qadr', month: 'Ramadan', day: 27, icon: '✨' },
        { name: 'Eid al-Fitr', month: 'Shawwal', day: 1, icon: '🎉' },
        { name: 'Day of Arafah', month: 'Dhul-Hijjah', day: 9, icon: '🕋' },
        { name: 'Eid al-Adha', month: 'Dhul-Hijjah', day: 10, icon: '🎊' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-block text-green-600 hover:text-green-700 mb-4">
                        ← Back to Home
                    </a>
                    <div className="text-5xl mb-4">📅</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Islamic Calendar
                    </h1>
                    <p className="text-gray-600">
                        Hijri calendar with special Islamic dates
                    </p>
                </div>

                {/* Coming Soon */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 mb-8 text-center">
                    <h2 className="text-2xl font-bold mb-2">🚧 Coming Soon!</h2>
                    <p className="text-green-100">
                        Full Hijri calendar with date converter and event details
                    </p>
                </div>

                {/* Today's Date */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        Today's Date
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 text-center">
                            <p className="text-sm text-gray-600 mb-2">Hijri</p>
                            <p className="text-2xl font-bold text-green-700 mb-1">
                                15 Shaban 1448
                            </p>
                            <p className="text-sm text-gray-500">(Sample Date)</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 text-center">
                            <p className="text-sm text-gray-600 mb-2">Gregorian</p>
                            <p className="text-2xl font-bold text-blue-700 mb-1">
                                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p className="text-sm text-gray-500">Today</p>
                        </div>
                    </div>
                </div>

                {/* Islamic Months */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        12 Islamic Months
                    </h3>
                    <div className="grid md:grid-cols-3 gap-3">
                        {islamicMonths.map((month, index) => (
                            <div
                                key={month}
                                className={`p-4 rounded-lg border-2 ${month === 'Ramadan'
                                        ? 'bg-purple-50 border-purple-300'
                                        : month === 'Dhul-Hijjah'
                                            ? 'bg-amber-50 border-amber-300'
                                            : 'bg-gray-50 border-gray-200'
                                    } hover:shadow-md transition-all`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-500">
                                        {index + 1}
                                    </span>
                                    <span className="font-semibold text-gray-800">{month}</span>
                                </div>
                                {month === 'Ramadan' && (
                                    <p className="text-xs text-purple-600 mt-1">Fasting Month</p>
                                )}
                                {month === 'Dhul-Hijjah' && (
                                    <p className="text-xs text-amber-600 mt-1">Hajj Month</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Special Islamic Dates */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Special Islamic Dates
                    </h3>
                    <div className="space-y-3">
                        {specialDays.map((day) => (
                            <div
                                key={day.name}
                                className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-white border-2 border-green-100 hover:border-green-300 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{day.icon}</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{day.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                {day.day} {day.month}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Coming */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                        <div className="text-3xl mb-2">🔄</div>
                        <h3 className="font-bold text-gray-800 mb-1">Date Converter</h3>
                        <p className="text-sm text-gray-600">Convert between Hijri and Gregorian dates</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                        <div className="text-3xl mb-2">🔔</div>
                        <h3 className="font-bold text-gray-800 mb-1">Event Reminders</h3>
                        <p className="text-sm text-gray-600">Get notified about upcoming Islamic events</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
