// Notification utility functions for prayer time reminders

export interface NotificationOptions {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    tag?: string;
    requireInteraction?: boolean;
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return 'denied';
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission;
    }

    return Notification.permission;
}

// Send a notification
export function sendNotification(options: NotificationOptions): void {
    if (Notification.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
    }

    const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/icon-192x192.png',
        badge: options.badge || '/icon-72x72.png',
        tag: options.tag || 'default',
        requireInteraction: options.requireInteraction || false,
    });

    notification.onclick = () => {
        window.focus();
        notification.close();
    };
}

// Schedule prayer time notifications
export function schedulePrayerNotification(
    prayerName: string,
    prayerTime: Date,
    minutesBefore: number = 15
): void {
    const notificationTime = new Date(prayerTime.getTime() - minutesBefore * 60000);
    const now = new Date();
    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    if (timeUntilNotification > 0) {
        setTimeout(() => {
            sendNotification({
                title: `${prayerName} Prayer Time`,
                body: `${prayerName} prayer will begin in ${minutesBefore} minutes`,
                tag: `prayer-${prayerName}`,
                requireInteraction: true,
            });
        }, timeUntilNotification);
    }
}

// Play adhan sound
export function playAdhan(audioUrl: string = '/sounds/adhan.mp3'): void {
    const audio = new Audio(audioUrl);
    audio.play().catch((error) => {
        console.error('Failed to play adhan:', error);
    });
}

// Check if browser supports notifications
export function isNotificationSupported(): boolean {
    return 'Notification' in window;
}

// Save notification preference
export function saveNotificationPreference(enabled: boolean): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('notificationsEnabled', JSON.stringify(enabled));
    }
}

// Get notification preference
export function getNotificationPreference(): boolean {
    if (typeof window !== 'undefined') {
        const pref = localStorage.getItem('notificationsEnabled');
        return pref ? JSON.parse(pref) : true;
    }
    return true;
}
