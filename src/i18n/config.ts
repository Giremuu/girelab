/**
 * Langues du site. Pour en ajouter une :
 *  1. l'ajouter ici,
 *  2. ajouter ses textes dans ui.ts,
 *  3. (optionnel) traduire le CV et les fiches projets ; sinon le français sert de repli.
 */
export const languages = {
  fr: { label: 'Français', short: 'FR', htmlLang: 'fr' },
  en: { label: 'English', short: 'EN', htmlLang: 'en' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';
export const langs = Object.keys(languages) as Lang[];

/** Paramètre `locale` des routes `[...locale]` : undefined pour la langue par défaut. */
export const localeParams = langs.map((l) => (l === defaultLang ? undefined : l));

export const langFromParam = (locale?: string): Lang =>
  locale && locale in languages ? (locale as Lang) : defaultLang;
