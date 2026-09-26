export const locales = ['fr', 'en'] as const;

export type Locale = (typeof locales)[number];

export const navigationLabels: Record<Locale, Record<string, string>> = {
  fr: {
    projects: 'Projets',
    journey: 'Parcours',
    cv: 'CV',
    about: 'A propos',
    contact: 'Contact',
  },
  en: {
    projects: 'Projects',
    journey: 'Journey',
    cv: 'CV',
    about: 'About',
    contact: 'Contact',
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr';
}

export function getLocalizedPath(locale: Locale, path = ''): string {
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');

  return normalizedPath ? `/${locale}/${normalizedPath}/` : `/${locale}/`;
}
