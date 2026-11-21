# 02 · Architecture

## Les technologies

| Techno | Rôle |
|---|---|
| [Astro](https://astro.build) | Framework : transforme les fichiers `.astro`, `.yaml`, `.md` en pages HTML statiques |
| TypeScript | JavaScript typé pour la logique, ce qui détecte les erreurs avant le build |
| [GSAP](https://gsap.com) | Animations : ouverture des cadres, cœur, apparitions au scroll |
| Canvas 2D | Fond animé (lucioles, pétales) |
| Web Audio | Sons d'interface et musique **générés en direct** (aucun fichier audio) |
| [Fontsource](https://fontsource.org) | Polices hébergées avec le site (pas d'appel à Google Fonts) |
| GitHub Actions + Pages | Build et hébergement automatiques |

## Le principe : un site statique

Astro fait tout le travail **au moment du build** (`npm run build`) : il lit le contenu, l'assemble avec les
composants et produit le dossier `dist/`, qui ne contient que du HTML, du CSS, un peu de JavaScript et
les images.

Il n'y a **ni serveur ni base de données** en production. Résultat : un site rapide, gratuit à héberger et
qui offre très peu de surface d'attaque.

```
 Contenu (YAML, Markdown)  ─┐
 Textes (src/i18n/ui.ts)   ─┼─►  Astro (build)  ─►  dist/ (HTML + CSS + JS)  ─►  GitHub Pages
 Composants (.astro)       ─┘
```

Dans le navigateur, le JavaScript ne sert qu'aux interactions (cœur, dialogue, sons, animations).
La navigation entre pages se fait **sans rechargement complet** grâce aux *View Transitions* d'Astro :
c'est ce qui permet le fondu entre les pages et une musique qui continue de jouer.

## Arborescence

```
girelab/
├── Documentations/          ← cette documentation + modèles de fiches
├── public/                  ← fichiers copiés tels quels dans le site
│   ├── favicon.svg
│   └── cv/                  ← CV en PDF proposés au téléchargement
├── src/
│   ├── assets/pfp.png       ← photo de profil (optimisée automatiquement)
│   ├── components/          ← briques réutilisables (voir 04 · Design)
│   ├── content/projects/    ← fiches projets / jeux, une par langue : fr/, en/
│   ├── content.config.ts    ← schémas du contenu (validation au build)
│   ├── data/
│   │   ├── contact.ts       ← liens de contact
│   │   └── cv/fr.yaml, en.yaml  ← le CV
│   ├── i18n/                ← langues : config, textes d'interface, chemins
│   ├── layouts/             ← gabarits : Base (toutes les pages), ProjectPage (fiches)
│   ├── lib/                 ← fonctions utilitaires (CV, projets)
│   ├── pages/               ← une page = un fichier (voir ci-dessous)
│   ├── scripts/             ← JavaScript navigateur : sons, musique, machine à écrire, scroll
│   └── styles/              ← tokens.css (couleurs, tailles), global.css (base)
├── .github/workflows/deploy.yml  ← build + déploiement automatique
├── astro.config.mjs         ← configuration Astro (domaine, sitemap, préchargement)
└── package.json             ← dépendances et commandes npm
```

## Les pages et le routage

Dans Astro, **un fichier de `src/pages/` donne une adresse** :

| Fichier | Adresses générées |
|---|---|
| `src/pages/[...locale]/index.astro` | `/` et `/en/` |
| `src/pages/[...locale]/cv.astro` | `/cv/` et `/en/cv/` |
| `src/pages/[...locale]/[projets]/index.astro` | `/projets/` et `/en/projects/` |
| `src/pages/[...locale]/[projets]/[slug].astro` | `/projets/suzune-check/`, `/en/projects/suzune-check/`… |
| `src/pages/404.astro` | `/404.html` |

Les noms entre crochets sont des **paramètres** :

- `[...locale]` : chaque page est générée **une fois par langue** à partir d'un seul fichier (rien en français,
  `en` en anglais) ;
- `[projets]`, `[jeux]`, `[mentions]` : le nom de la section, **traduit selon la langue** (`projets` / `projects`),
  d'après la table `routeSegments` de `src/i18n/routes.ts` ;
- `[slug]` : une page par fiche projet (nom du fichier `.md`). Les listes viennent de `getStaticPaths()`
en haut de chaque fichier.

## Les commandes

```sh
npm install        # installer les dépendances (une fois)
npm run dev        # site local sur http://localhost:4321, rechargé à chaque sauvegarde
npm run build      # générer le site dans dist/
npm run preview    # servir dist/ en local pour vérifier le résultat final
npx astro check    # vérifier les types (erreurs TypeScript)
```
