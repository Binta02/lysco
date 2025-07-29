// src/utils/notifications.ts
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

// Demander permission + configurer
export const configureNotifications = async () => {
  const perm = await LocalNotifications.requestPermissions();
  console.log('Notification permissions:', perm);
};

// Planifier une notification
export const scheduleNotification = async (title: string, body: string, date: Date) => {
  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id: Math.floor(Math.random() * 100000), // ID unique
        schedule: { at: date },
        sound: 'beep.aiff',
      },
    ],
  });
};

// Mettre à jour le badge
export const updateBadge = async (count: number) => {
  const badgePlugin = (window as any).plugins?.badge;
  if (!badgePlugin) {
    console.warn('Badge plugin not available');
    return;
  }

  badgePlugin.hasPermission((granted: boolean) => {
    if (!granted) {
      badgePlugin.requestPermission((grantedReq: boolean) => {
        if (!grantedReq) {
          console.warn('Badge permission denied');
          return;
        }
        setOrClearBadge();
      });
    } else {
      setOrClearBadge();
    }
  });

  const setOrClearBadge = () => {
    if (count > 0) {
      badgePlugin.set(count);
    } else {
      badgePlugin.clear();
    }
  };
};
