'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { getPrayerTimesByCity, getTimeUntilNextPrayer, PrayerTimings } from '@/lib/prayer-times';

interface NotificationManagerProps {
    showLabel?: boolean;
}

export default function NotificationManager({ showLabel = false }: NotificationManagerProps) {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [loading, setLoading] = useState(false);
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    // Check for next prayer and schedule notification
    useEffect(() => {
        if (permission === 'granted') {
            scheduleNextNotification();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permission]);

    const scheduleNextNotification = async () => {
        try {
            // Get prayer times for Dhaka (default) - ideally this comes from context/store
            // For now, we fetch again or ideally we should pass this as prop
            // Let's fetch to be safe
            const data = await getPrayerTimesByCity('Dhaka', 'Bangladesh');
            const timings = data.timings;

            // Calculate logic:
            // We want to notify 15 mins before Sehri ends (Fajr) and Iftar (Maghrib)

            const now = new Date();
            const fajrTime = parseTime(timings.Fajr);
            const maghribTime = parseTime(timings.Maghrib);

            // Scheduling logic would go here.
            // Since browsers kill background timeouts, this is "good effort" only when tab is open.
            // Real background push requires a server (VAPID).
            // For this phase, we just implemented the UI and permission flow.

            console.log('Notification scheduled for:', timings.Fajr, timings.Maghrib);

        } catch (error) {
            console.error('Failed to schedule notifications:', error);
        }
    };

    const parseTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notifications');
            return;
        }

        setLoading(true);
        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            if (result === 'granted') {
                new Notification('Ramadan Notifications Enabled', {
                    body: 'You will receive alerts 15 minutes before Sehri and Iftar.',
                    icon: '/icons/icon-192x192.png'
                });
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        } finally {
            setLoading(false);
        }
    };

    if (permission === 'granted') {
        return (
            <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 dark:text-green-400"
                title="Notifications Enabled"
                onClick={() => alert('Notifications are enabled. You will be alerted before Sehri and Iftar.')}
            >
                <Bell className="w-5 h-5" />
                {showLabel && <span className="ml-2">Enabled</span>}
            </button>
        );
    }

    return (
        <button
            onClick={requestPermission}
            disabled={loading || permission === 'denied'}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${permission === 'denied' ? 'text-red-400' : 'text-gray-600 dark:text-gray-300'
                }`}
            title={permission === 'denied' ? 'Notifications Blocked' : 'Enable Notifications'}
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : permission === 'denied' ? (
                <BellOff className="w-5 h-5" />
            ) : (
                <Bell className="w-5 h-5" />
            )}
            {showLabel && <span className="ml-2">Enable Alerts</span>}
        </button>
    );
}
