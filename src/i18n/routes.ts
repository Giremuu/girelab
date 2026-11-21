/**
 * Gestion des chemins selon la langue : le français est à la racine (/cv/),
 * les autres langues sont préfixées (/en/cv/).
 */
import { defaultLang, langs, type Lang } from './config';

/** Préfixe une route avec la langue : ('/cv/', 'en') → '/en/cv/' ; ('/cv/', 'fr') → '/cv/'. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean}`;
}

/** Retire le préfixe de langue d'un chemin : '/en/cv/' → '/cv/'. */
export function stripLang(path: string): string {
  for (const l of langs) {
    if (l === defaultLang) continue;
    if (path === `/${l}` || path === `/${l}/`) return '/';
    if (path.startsWith(`/${l}/`)) return path.slice(l.length + 1);
  }
  return path;
}
