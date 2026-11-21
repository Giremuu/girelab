# 06 · Langues

## Fonctionnement

- Le **français** est la langue par défaut, à la racine : `/`, `/cv/`, `/contact/`…
- L'**anglais** est préfixé : `/en/`, `/en/cv/`, `/en/contact/`…
- Les **noms de section sont traduits** dans l'adresse : `/projets/` → `/en/projects/`, `/jeux/` → `/en/games/`,
  `/mentions-legales/` → `/en/legal-notice/`.
- Le bouton de langue du header (drapeau + code, ex. 🇫🇷 FR ▾) ouvre la liste des langues ; chaque entrée renvoie vers **la même page** dans sa langue.
- Chaque page déclare ses versions dans les autres langues (`hreflang`), pour les moteurs de recherche.

Les pages ne sont **pas dupliquées** : `src/pages/[...locale]/cv.astro` génère `/cv/` et `/en/cv/`.

Dans le code, les liens s'écrivent toujours **en français** (`localizePath('/projets/', lang)`) : la fonction
ajoute le préfixe de langue et traduit le nom de section automatiquement.

| Fichier | Rôle |
|---|---|
| `src/i18n/config.ts` | Liste des langues (nom, code court, attribut `lang`) et langue par défaut |
| `src/i18n/ui.ts` | Textes d'interface de chaque langue |
| `src/i18n/routes.ts` | Table des sections traduites (`routeSegments`) ; `localizePath('/jeux/', 'en')` → `/en/games/` ; `stripLang('/en/games/')` → `/jeux/` |

Pour le **contenu** (hors interface) :

- CV : un fichier par langue, `src/data/cv/<langue>.yaml`. Sans fichier, la version française est utilisée.
- Fiches projets : `src/content/projects/<langue>/<nom>.md`. Sans traduction, la version française
  s'affiche avec un bandeau.
- Liens de contact : communs à toutes les langues.

## Ajouter le japonais (`ja`)

1. **`src/i18n/config.ts`** : ajouter la langue.
   ```ts
   export const languages = {
     fr: { label: 'Français', short: 'FR', htmlLang: 'fr' },
     en: { label: 'English', short: 'EN', htmlLang: 'en' },
     ja: { label: '日本語', short: 'JP', htmlLang: 'ja' },
   } as const;
   ```
2. **`src/i18n/ui.ts`** : créer `const ja: Dict = { … }` avec toutes les clés (copier `en` et traduire),
   puis l'ajouter dans `const dictionaries = { fr, en, ja }`. TypeScript signale les clés manquantes.
3. **`src/i18n/routes.ts`** : traduire les noms de section dans `routeSegments` (facultatif : sans traduction,
   le nom français est gardé).
4. **`src/data/cv/ja.yaml`** : traduire le CV (même structure que `fr.yaml`).
5. **Fiches projets** : `src/content/projects/ja/<nom>.md` (facultatif, repli sur le français).
6. **CV en PDF** : déposer `public/cv/cv-ja.pdf`. Le bouton du CV propose déjà « JP · 日本語 » :
   il s'active dès que le fichier existe.
7. **Polices** : le site ne charge que les caractères latins (pour aller plus vite). Pour le japonais,
   ajouter dans `src/layouts/Base.astro` les imports `@fontsource/dotgothic16/japanese-400.css`,
   `@fontsource/zen-maru-gothic/japanese-400.css` et `japanese-700.css`. Idéalement, seulement sur les
   pages `/ja/`, pour ne pas alourdir le français et l'anglais.

Conseils pour la version japonaise :

- faire relire les textes par une personne de langue maternelle japonaise ;
- les entreprises japonaises traditionnelles attendent aussi un **履歴書 (rirekisho)** et un
  **職務経歴書 (shokumu keirekisho)** au format japonais : le CV du site ne les remplace pas.
