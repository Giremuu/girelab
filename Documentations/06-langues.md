# 06 · Langues

## Fonctionnement

- Le **français** est la langue par défaut, à la racine : `/`, `/cv/`, `/contact/`…
- L'**anglais** est préfixé : `/en/`, `/en/cv/`, `/en/contact/`…
- Le sélecteur **FR ▾** du header renvoie vers **la même page** dans l'autre langue.
- Chaque page déclare ses versions dans les autres langues (`hreflang`), pour les moteurs de recherche.

Les pages ne sont **pas dupliquées** : `src/pages/[...locale]/cv.astro` génère `/cv/` et `/en/cv/`.

| Fichier | Rôle |
|---|---|
| `src/i18n/config.ts` | Liste des langues (nom, code court, attribut `lang`) et langue par défaut |
| `src/i18n/ui.ts` | Textes d'interface de chaque langue |
| `src/i18n/routes.ts` | `localizePath('/cv/', 'en')` → `/en/cv/` ; `stripLang('/en/cv/')` → `/cv/` |

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
3. **`src/data/cv/ja.yaml`** : traduire le CV (même structure que `fr.yaml`).
4. **Fiches projets** : `src/content/projects/ja/<nom>.md` (facultatif, repli sur le français).
5. **CV en PDF** : déposer `public/cv/cv-ja.pdf`. Le bouton du CV propose déjà « JP · 日本語 » :
   il s'active dès que le fichier existe.
6. **Polices** : DotGothic16 et Zen Maru Gothic contiennent déjà les caractères japonais.

Conseils pour la version japonaise :

- faire relire les textes par une personne de langue maternelle japonaise ;
- les entreprises japonaises traditionnelles attendent aussi un **履歴書 (rirekisho)** et un
  **職務経歴書 (shokumu keirekisho)** au format japonais : le CV du site ne les remplace pas.
