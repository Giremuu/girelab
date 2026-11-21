/**
 * Gestion des chemins selon la langue.
 * - Le français est à la racine (/projets/), les autres langues sont préfixées (/en/projects/).
 * - Certains noms de section sont traduits dans l'URL (table `routeSegments`).
 *
 * Dans le code, on écrit toujours les chemins EN FRANÇAIS (forme « canonique ») :
 *   localizePath('/projets/suzune-check/', 'en') → '/en/projects/suzune-check/'
 */
import { defaultLang, langs, type Lang } from './config';

/**
 * Noms de section traduits dans l'URL. Clé = nom français (= nom du paramètre de dossier
 * dans src/pages/[...locale]/[clé]/). Une langue absente garde le nom français.
 * Ajouter une langue : ajouter sa traduction ici (ex. ja: 'purojekuto').
 */
export const routeSegments = {
  projets: { en: 'projects' },
  jeux: { en: 'games' },
  'mentions-legales': { en: 'legal-notice' },
} as const satisfies Record<string, Partial<Record<Lang, string>>>;

export type Section = keyof typeof routeSegments;

const isSection = (s: string): s is Section => s in routeSegments;

/** Nom d'une section dans l'URL pour une langue : ('projets', 'en') → 'projects'. */
export function segmentFor(section: Section, lang: Lang): string {
  return (routeSegments[section] as Partial<Record<Lang, string>>)[lang] ?? section;
}

/**
 * Chemin français → chemin dans la langue demandée (préfixe + section traduite).
 * ('/cv/', 'en') → '/en/cv/' ; ('/jeux/', 'en') → '/en/games/' ; ('/jeux/', 'fr') → '/jeux/'.
 */
export function localizePath(path: string, lang: Lang): string {
  const parts = (path.startsWith('/') ? path : `/${path}`).split('/'); // ['', 'jeux', '']
  if (parts[1] && isSection(parts[1])) parts[1] = segmentFor(parts[1], lang);
  const localized = parts.join('/');
  return lang === defaultLang ? localized : `/${lang}${localized}`;
}

/**
 * Chemin dans n'importe quelle langue → chemin français (inverse de localizePath).
 * '/en/games/' → '/jeux/' ; '/en/cv/' → '/cv/' ; '/en/' → '/'.
 */
export function stripLang(path: string): string {
  let lang: Lang = defaultLang;
  let rest = path;
  for (const l of langs) {
    if (l === defaultLang) continue;
    if (path === `/${l}` || path === `/${l}/`) return '/';
    if (path.startsWith(`/${l}/`)) {
      lang = l;
      rest = path.slice(l.length + 1);
      break;
    }
  }
  const parts = rest.split('/');
  const section = (Object.keys(routeSegments) as Section[]).find((s) => segmentFor(s, lang) === parts[1]);
  if (section) parts[1] = section;
  return parts.join('/');
}
