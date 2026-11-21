/**
 * Outils pour les fiches projets / jeux : lecture de la collection, repli sur le français
 * si une fiche n'est pas traduite, tri par date, URL de chaque fiche.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/config';
import { localizePath } from '../i18n/routes';

type Entry = CollectionEntry<'projects'>;
export type Kind = Entry['data']['kind'];

/** Un projet résolu pour une langue donnée. */
export interface Project {
  slug: string;
  lang: Lang;
  entry: Entry;
  data: Entry['data'];
  /** true si la langue demandée n'a pas de traduction (version FR affichée). */
  fallback: boolean;
}

/** Section du site où vit chaque type de projet. */
export const section: Record<Kind, 'jeux' | 'projets'> = {
  game: 'jeux',
  tool: 'projets',
  script: 'projets',
};

export const projectUrl = (p: Project) => localizePath(`/${section[p.data.kind]}/${p.slug}/`, p.lang);

const split = (id: string) => {
  const [lang, ...rest] = id.split('/');
  return { lang, slug: rest.join('/') };
};

/** Projets publiés pour une langue (avec repli FR), du plus récent au plus ancien. */
export async function getProjects(kinds: Kind[], lang: Lang): Promise<Project[]> {
  const all = await getCollection('projects', (p) => import.meta.env.DEV || !p.data.draft);
  const bySlug = new Map<string, Partial<Record<string, Entry>>>();
  for (const e of all) {
    const { lang: l, slug } = split(e.id);
    bySlug.set(slug, { ...bySlug.get(slug), [l]: e });
  }
  const out: Project[] = [];
  for (const [slug, versions] of bySlug) {
    const entry = versions[lang] ?? versions[defaultLang];
    if (!entry || !kinds.includes(entry.data.kind)) continue;
    out.push({ slug, lang, entry, data: entry.data, fallback: !versions[lang] });
  }
  return out.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
