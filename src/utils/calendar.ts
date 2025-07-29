import { Capacitor } from '@capacitor/core';

/**
 * Interface pour les options du calendrier
 */
interface CalendarEventOptions {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  location?: string;
  notes?: string;
  alarm?: boolean;
}

/**
 * Vérifie si le plugin calendrier est disponible
 */
const isCalendarPluginAvailable = (): boolean => {
  return !!(window as any).plugins?.calendar;
};

/**
 * Valide et convertit une date en objet Date
 */
const ensureValidDate = (date: Date | string, paramName: string): Date => {
  const result = date instanceof Date ? date : new Date(date);
  
  if (isNaN(result.getTime())) {
    throw new Error(`Paramètre ${paramName} invalide. Reçu: ${date}`);
  }
  
  return result;
};

/**
 * Ajoute un événement au calendrier de l'appareil
 */
export const addToCalendar = async (options: CalendarEventOptions): Promise<void> => {
  try {
    // Vérification de la plateforme
    if (!Capacitor.isNativePlatform()) {
      console.warn('Fonctionnalité disponible uniquement sur mobile');
      throw new Error('Cette fonctionnalité nécessite une application mobile');
    }

    // Vérification du plugin
    if (!isCalendarPluginAvailable()) {
      console.error('Plugin calendrier non disponible');
      throw new Error('La fonction calendrier ne est pas disponible sur cet appareil');
    }

    // Validation et conversion des dates
    const startDate = ensureValidDate(options.startDate, 'startDate');
    const endDate = ensureValidDate(options.endDate, 'endDate');

    // Vérification de la cohérence des dates
    if (startDate >= endDate) {
      throw new Error('La date de fin doit être postérieure à la date de début');
    }

    // Configuration de l'événement
    const eventConfig = {
      title: options.title,
      location: options.location || '',
      notes: options.notes || '',
      startTime: startDate,
      endTime: endDate,
      options: {
        firstReminderMinutes: options.alarm ? 60 : undefined,
      }
    };

    console.debug('Tentative d\'ajout au calendrier:', eventConfig);

    // Appel au plugin
    return new Promise((resolve, reject) => {
      (window as any).plugins.calendar.createEvent(
        eventConfig.title,
        eventConfig.location,
        eventConfig.notes,
        eventConfig.startTime,
        eventConfig.endTime,
        () => {
          console.log('Événement ajouté avec succès');
          resolve();
        },
        (error: any) => {
          console.error('Erreur du plugin calendrier:', error);
          reject(new Error(`Échec de l'ajout au calendrier: ${error.message || error}`));
        }
      );
    });

  } catch (error) {
    console.error('Erreur dans addToCalendar:', error);
    throw error instanceof Error ? error : new Error('Erreur inconnue lors de l\'ajout au calendrier');
  }
};

/**
 * Vérifie les permissions du calendrier
 */
export const checkCalendarPermissions = async (): Promise<boolean> => {
  if (!isCalendarPluginAvailable()) return false;

  return new Promise((resolve) => {
    (window as any).plugins.calendar.hasPermission((granted: boolean) => {
      resolve(granted);
    });
  });
};

/**
 * Demande les permissions pour le calendrier
 */
export const requestCalendarPermissions = async (): Promise<boolean> => {
  if (!isCalendarPluginAvailable()) return false;

  return new Promise((resolve) => {
    (window as any).plugins.calendar.requestPermission((granted: boolean) => {
      resolve(granted);
    });
  });
};