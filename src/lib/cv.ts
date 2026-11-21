/**
 * Outils pour la page CV (/cv/) : lecture du CV selon la langue, format des périodes, liste des diplômes.
 * Les données viennent de src/data/cv/<langue>.yaml (schéma : src/content.config.ts).
 */
import { getEntry, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/config';

export type Cv = CollectionEntry<'cv'>['data'];

/** CV dans la langue demandée, ou en français si cette langue n'a pas encore de fichier. */
export async function getCv(lang: Lang): Promise<Cv> {
  const entry = (await getEntry('cv', lang)) ?? (await getEntry('cv', defaultLang));
  if (!entry) throw new Error(`CV introuvable : src/data/cv/${defaultLang}.yaml`);
  return entry.data;
}

/**
 * Affiche une période :
 * « 2023 → 2025 », « 2025 → aujourd'hui » (pas de fin) ou « 2025 » (pas de début).
 */
export function formatPeriod(now: string, start?: string, end?: string): string {
  return start ? `${start} → ${end ?? now}` : (end ?? '');
}

/** Diplômes et certifications dans une seule liste, du plus récent au plus ancien. */
export function getDegrees(cv: Cv) {
  return [
    ...cv.education,
    ...cv.certifications.map((c) => ({
      title: c.title,
      org: c.org,
      end: c.year,
      start: undefined,
      location: undefined,
    })),
  ].sort((a, b) => Number(b.end ?? b.start ?? 0) - Number(a.end ?? a.start ?? 0));
}
