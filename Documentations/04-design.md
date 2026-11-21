# 04 · Design

## Les tokens (`src/styles/tokens.css`)

Toutes les couleurs, polices et tailles de base sont des **variables CSS** définies à un seul endroit.
Change une valeur ici, elle change partout.

| Variable | Valeur | Usage |
|---|---|---|
| `--black` | `#000` | Fond des cadres de dialogue et de menu |
| `--night` | `#050509` | Fond du site |
| `--night-2` | `#0f0f1e` | Fond des fenêtres (CV, projets) |
| `--night-3` | `#1c1c34` | Barres header / footer, survols |
| `--paper` | `#f2f0e6` | Texte, bordures blanches |
| `--paper-dim` | `#a9a6b8` | Texte secondaire (gris) |
| `--matcha` | `#7fbf6a` | **Couleur principale** : boutons, titres, ◆ |
| `--kin` | `#f3c25b` | Couleur secondaire (doré) : élément sélectionné, liens, « en apprentissage » |
| `--ai` | `#4b5ea8` | Détails : contour des tags, pointillés de la timeline |
| `--px` | `4px` | Unité « pixel » : `calc(var(--px) * 5)` = 20px |
| `--container` | `1600px` | Largeur max du contenu |
| `--gutter` | `16px → 64px` | Marge sur les côtés (s'adapte à l'écran) |

Pour utiliser une couleur dans un composant : `color: var(--matcha);`.

**Attention** : si tu supprimes une variable, les éléments qui l'utilisent deviennent invisibles.
Cherche son nom dans tout le projet avant (Ctrl+Shift+F dans VS Code).

Quelques couleurs sont écrites en dur ailleurs, parce que ces endroits ne lisent pas les variables CSS :

| Élément | Fichier |
|---|---|
| Le cœur (`#ff0000`) | `src/components/HeartMenu.astro` (`.heart`) |
| Lucioles et pétales | `src/components/Fireflies.astro` (`ctx.fillStyle`) |
| Favicon | `public/favicon.svg` |

## Anatomie d'un fichier `.astro`

```astro
---
// 1. Frontmatter : JavaScript exécuté AU BUILD (lecture des données, props)
interface Props { title: string }
const { title } = Astro.props;
---

<!-- 2. HTML, avec des {variables} -->
<h2 class="titre">{title}</h2>

<script>
  // 3. JavaScript exécuté DANS LE NAVIGATEUR (interactions)
</script>

<style>
  /* 4. CSS limité à ce composant (n'affecte pas le reste du site) */
  .titre { color: var(--matcha); }
</style>
```

Pour cibler un élément d'un **autre** composant depuis un `<style>`, on utilise `:global(...)`.

## Les composants (`src/components/`)

| Composant | Rôle | Utilisé dans |
|---|---|---|
| `DialogBox` | Cadre portrait + texte tapé lettre par lettre | Accueil, Contact |
| `HeartMenu` | Cadre de boutons + cœur-curseur | Accueil, Contact |
| `Window` | Fenêtre à bordure blanche avec onglet de titre | CV, Projets, fiches |
| `SkillGroup` | Un thème de skills avec ses tags (pleins et pointillés) | CV |
| `CvDownload` | Bouton « Télécharger le CV » avec choix de la langue | CV |
| `InventoryItem` | Case d'un projet (icône, titre, description, tags, statut) | Projets, Jeux |
| `ProjectList` | Grille de cases `InventoryItem` | Projets, Jeux |
| `ComingSoon` | Écran « Bientôt disponible » | Projets, Jeux |
| `LangSwitcher` | Bouton de langue du header : drapeau pixel de la langue en cours + liste des langues | Header |
| `AudioToggle` | Boutons ♪ Son / ♫ Musique du header | Header |
| `Fireflies` | Fond animé (canvas) | Toutes les pages |

### Réglages de `HeartMenu`

```astro
<HeartMenu
  choices={choices}       // liste de { href, label, sub? } ; href: null = bouton grisé
  hint="…"                // aide sous les boutons (masquée sur mobile)
  label="…"               // nom accessible du menu
  columns={3}             // boutons par ligne (défaut : 2)
  width="340px"           // longueur max d'un bouton (défaut : 400px)
  gap="min(120px, 6vw)"   // écart entre colonnes (défaut : min(400px, 20vw))
/>
```

La taille du cœur se règle dans `HeartMenu.astro` (attributs `width` / `height` du `<svg class="heart">`,
garder le rapport 11 × 10). Sa forme est une grille de texte (`#` = pixel rempli) en haut du fichier.

## Les gabarits (`src/layouts/`)

- **`Base.astro`** entoure toutes les pages : `<head>`, header (logo, nav, langue, son, musique), fond animé,
  footer, transitions de page. Le style du header et du footer est en bas de ce fichier.
- **`ProjectPage.astro`** est la page d'une fiche projet ou jeu : contenu à gauche, bloc « Infos » à droite.

## Responsive

Le site est pensé pour fonctionner de 360px (mobile) à 1920px et plus :

- les colonnes du CV et des fiches passent en une seule colonne sous ~900px ;
- la navigation du header passe sur sa propre ligne, défilable, sous 820px ;
- les menus au cœur à 3 colonnes ou plus s'empilent sous 720px ;
- les libellés « Son : » et « Musique : » disparaissent sous 600px.

Les seuils sont dans les blocs `@media (max-width: …)` de chaque composant.
