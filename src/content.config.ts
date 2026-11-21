/**
 * Schémas du contenu du site (validés au build : une erreur de saisie fait échouer le build).
 * - projects : fiches projets / jeux, src/content/projects/<langue>/<slug>.md
 * - cv       : un fichier par langue, src/data/cv/<langue>.yaml
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Projets : src/content/projects/<langue>/<slug>.md
 * Le slug (nom du fichier) est commun à toutes les langues ; une langue sans
 * traduction retombe sur la version française.
 * Le build échoue si une fiche ne respecte pas ce schéma.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['game', 'tool', 'script']),
    description: z.string().max(160),
    icon: z.string().default('◆'), // caractère affiché dans la case d'inventaire
    tags: z.array(z.string()).default([]),
    status: z.enum(['wip', 'stable', 'archived']).default('wip'),
    repo: z.url().optional(),
    demo: z.url().optional(),
    // Jeux web : dossier servi sous /games/<slug>/ (voir le workflow de déploiement)
    playable: z.boolean().default(false),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/** CV : un fichier par langue, src/data/cv/<langue>.yaml */
const cv = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/data/cv' }),
  schema: z.object({
    profile: z.object({
      name: z.string(),
      role: z.string(),
      location: z.string().optional(),
      summary: z.string(),
      // Langues parlées ; learning: true = affichée en pointillés (en apprentissage)
      languages: z
        .array(z.object({ label: z.string(), level: z.string(), learning: z.boolean().default(false) }))
        .default([]),
    }),
    skills: z.array(
      z.object({
        label: z.string(),
        note: z.string().optional(),
        tags: z.array(z.string()).default([]), // technos maîtrisées
        learning: z.array(z.string()).default([]), // technos en cours d'apprentissage
      }),
    ),
    experiences: z
      .array(
        z.object({
          title: z.string(),
          org: z.string(),
          location: z.string().optional(),
          start: z.string().optional(),
          end: z.string().optional(),
          context: z.string().optional(), // ex. taille du parc, environnement
          details: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    // Diplômes : `end` = année d'obtention ; `start` facultatif (affiche « début → fin »)
    education: z
      .array(
        z.object({
          title: z.string(),
          org: z.string(),
          location: z.string().optional(),
          start: z.string().optional(),
          end: z.string().optional(),
        }),
      )
      .default([]),
    certifications: z
      .array(
        z.object({
          title: z.string(),
          org: z.string(),
          year: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects, cv };
