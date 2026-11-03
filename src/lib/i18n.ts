import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * The course ships in Italian. UI strings live here so a second language only
 * needs a new `resources` entry — lesson content is data, not strings, and is
 * swapped by adding `content/<lang>/weeks`.
 */
export const resources = {
  it: {
    translation: {
      app: { name: 'JavaScript Mastery', tagline: 'Dodici settimane, un progetto reale.' },
      nav: {
        home: 'Home',
        course: 'Percorso',
        stats: 'Statistiche',
        settings: 'Impostazioni',
        review: 'Ripassi',
      },
      actions: {
        run: 'Esegui',
        reset: 'Ripristina',
        hint: 'Indizio',
        solution: 'Mostra soluzione',
        next: 'Prossima lezione',
        complete: 'Segna come completata',
        resume: 'Riprendi',
      },
      status: {
        online: 'Online',
        offline: 'Offline · progressi in coda',
        synced: 'Sincronizzato',
      },
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'it',
  fallbackLng: 'it',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
