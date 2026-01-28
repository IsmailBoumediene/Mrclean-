export type Locale = 'en' | 'fr';

export const i18n = {
  defaultLocale: 'fr' as Locale,
  locales: ['en', 'fr'] as Locale[],
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};
