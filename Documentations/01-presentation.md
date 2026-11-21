# 01 · Présentation

## Le site

**girelab** est le site personnel de Gwilherm « Giremuu » Le Gallic, profil cybersécurité blue team et
sysadmin. Il regroupe :

- un **CV** interactif, avec un bouton pour télécharger la version PDF (FR / EN) ;
- les **projets** : outils, scripts, rôles d'automatisation ;
- les **jeux**, à venir, avec la possibilité de les jouer directement dans le navigateur ;
- les liens de **contact** : GitHub, LinkedIn, Root-Me.

Adresse prévue : **https://girelab.dev**, hébergé gratuitement sur GitHub Pages.

## La direction artistique

Un petit **RPG nocturne japonais**, inspiré de l'interface des RPG indépendants :

- fond nuit, lucioles et pétales animés en pixel art ;
- **boîtes de dialogue** où le personnage parle, texte écrit lettre par lettre avec des « blips » ;
- **menus au cœur** : un cœur rouge en pixel remplace le curseur de la souris pour choisir une destination ;
- polices pixel (DotGothic16) pour les titres et ronde (Zen Maru Gothic) pour la lecture ;
- palette verte (matcha) et dorée, définie dans `src/styles/tokens.css`.

Les sons d'interface et la musique chiptune sont **coupés par défaut**, le visiteur les active depuis le header.

## Les pages

| Page | Adresse (FR · EN) | Contenu |
|---|---|---|
| Accueil | `/` · `/en/` | Dialogue d'accueil + menu au cœur (CV · Projets · Jeux · Contact) |
| CV | `/cv/` · `/en/cv/` | Profil, langues, skills, diplômes et certifications, expériences, bouton PDF |
| Projets | `/projets/` · `/en/projects/` | Fiches outils et scripts (ex. suzune_check) |
| Fiche projet | `/projets/<nom>/` · `/en/projects/<nom>/` | Détail d'un projet + lien vers le code |
| Jeux | `/jeux/` · `/en/games/` | « Bientôt disponible » pour l'instant |
| Contact | `/contact/` · `/en/contact/` | Dialogue + menu au cœur vers GitHub, LinkedIn, Root-Me |
| Mentions légales | `/mentions-legales/` · `/en/legal-notice/` | Éditeur, hébergeur, données personnelles (lien dans le footer) |
| 404 | n'importe quelle adresse inconnue | Page d'erreur FR / EN |

Chaque page existe en français et en anglais, avec les noms de section traduits dans l'adresse
(voir [06 · Langues](06-langues.md)).
