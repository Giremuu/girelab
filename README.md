# girelab

Site personnel de **Gwilherm « Giremuu » Le Gallic** (cybersécurité blue team · sysadmin) : CV, projets,
jeux et contact. En ligne sur **[girelab.dev](https://girelab.dev)**.

Direction artistique : un petit RPG nocturne japonais en pixel art, avec boîtes de dialogue et cœur-curseur,
en français et en anglais.

## Démarrer

```sh
npm install        # une seule fois
npm run dev        # http://localhost:4321, rechargé à chaque sauvegarde
```

| Commande | Rôle |
|---|---|
| `npm run build` | Générer le site dans `dist/` |
| `npm run preview` | Tester le site généré en local |
| `npx astro check` | Vérifier qu'il n'y a pas d'erreur TypeScript |

## Modifier le contenu, en bref

| Quoi | Où |
|---|---|
| CV | `src/data/cv/fr.yaml`, `en.yaml` |
| CV en PDF (bouton « Télécharger le CV ») | `public/cv/cv-fr.pdf`, `cv-en.pdf`, `cv-ja.pdf` |
| Liens de contact | `src/data/contact.ts` |
| Textes d'interface (menus, dialogues) | `src/i18n/ui.ts` |
| Projet ou jeu | `src/content/projects/fr/<nom>.md` (+ `en/`), modèles dans `Documentations/modeles-fiches/` |
| Couleurs, tailles | `src/styles/tokens.css` |

## Documentation

Tout est expliqué dans **[Documentations/](Documentations/README.md)** : présentation, architecture,
contenu, design et composants, interactions (dialogue, cœur, sons, musique), langues, mise en ligne et
dépannage.

## Stack

[Astro](https://astro.build) (site statique) · TypeScript · [GSAP](https://gsap.com) (animations) ·
Canvas 2D (fond animé) · Web Audio (sons et musique générés, sans fichier) · Fontsource (polices) ·
GitHub Actions + GitHub Pages (déploiement).

## Roadmap

1. - [x] Première fiche projet : [suzune_check](https://github.com/Giremuu/suzune_check)
2. - [x] CV en PDF (FR, EN) dans `public/cv/`, téléchargeables depuis le CV
3. - [x] Documentation complète et code commenté
4. - [x] **Mise en ligne** : repo public, GitHub Pages, domaine girelab.dev (HTTPS, CAA, DNSSEC)
       (voir [07 · Mise en ligne](Documentations/07-mise-en-ligne.md))
5. - [ ] **Premier jeu** : fiche + jeu jouable dans le navigateur
6. - [ ] **Version japonaise** (`/ja/`), d'ici 2 à 3 ans
       (voir [06 · Langues](Documentations/06-langues.md))


## Licence

Code et contenu © Gwilherm Le Gallic. Tous droits réservés.
