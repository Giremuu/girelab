# 03 · Modifier le contenu

Le contenu est **séparé du design** : pour changer un texte, tu n'as presque jamais besoin de toucher aux
composants.

## Où se trouve quoi

| Je veux changer… | Fichier |
|---|---|
| Le CV (profil, langues, skills, expériences, diplômes) | `src/data/cv/fr.yaml` et `en.yaml` |
| Les liens de contact | `src/data/contact.ts` |
| Les textes d'interface (menus, boutons, dialogues d'accueil et de contact) | `src/i18n/ui.ts` |
| Ajouter un projet ou un jeu | `src/content/projects/fr/<nom>.md` (+ `en/`) |
| La photo de profil | `src/assets/pfp.png` (remplacer en gardant le nom) |
| Les mentions légales | objet `content` dans `src/pages/[...locale]/[mentions]/index.astro` |
| Les CV en PDF | déposer `cv-fr.pdf`, `cv-en.pdf` (et plus tard `cv-ja.pdf`) dans `public/cv/` |

## Le CV (`src/data/cv/<langue>.yaml`)

```yaml
profile:
  name: 'Gwilherm "Giremuu" LE GALLIC'
  role: Cybersécurité Blue Team · Sysadmin
  location: France
  summary: >-                  # texte sur plusieurs lignes
    Côté tech, je suis…
  languages:
    - { label: Anglais, level: B2 }
    - { label: Japonais, level: En cours, learning: true }   # learning = affiché en pointillés

skills:                        # un thème = un bloc
  - label: Cybersécurité Blue Team
    tags: [SIEM, EDR, …]          # technos maîtrisées
    learning: [Terraform]                      # facultatif : en cours d'apprentissage

experiences:                   # de la plus récente à la plus ancienne
  - title: Administrateur systèmes et réseaux (CDD)
    org: IDEA Logistique
    location: Montoir-de-Bretagne (44550)
    start: Août 2026           # facultatif
    end: Déc. 2026             # sans `end` : « → aujourd'hui »
    context: "Parc : …"        # facultatif, en italique
    details:
      - Mise en place du SIEM

education:                     # `end` = année d'obtention
  - title: BTS SIO, option SISR
    org: Institut Informatique Appliqué (IIA)
    location: Saint-Nazaire (44600)
    end: '2025'

certifications:
  - { title: MOOC RGPD (L'atelier RGPD), org: CNIL, year: '2024' }
```

Les diplômes et les certifications sont **mélangés et triés par année** automatiquement dans le bloc
« Diplômes et certifications ».

### Règles YAML à connaître

- Un texte qui contient **« : »** doit être **entre guillemets** : `- "Projet : migration MDM"`.
  Sans guillemets, le build échoue avec une erreur *Nested mappings…*
- Une année seule doit être entre guillemets (`'2025'`), sinon YAML la lit comme un nombre.
- L'indentation se fait **avec des espaces**, jamais des tabulations.
- Dans une liste entre accolades `{ … }`, une virgule sépare les champs : un texte qui contient une
  virgule doit être entre guillemets (`{ title: 'BTS SIO, option SISR', … }`), ou écrit sur plusieurs lignes.
- Garde la **même structure** dans `fr.yaml` et `en.yaml`.

Le schéma complet (champs obligatoires et facultatifs) est dans `src/content.config.ts` : si un champ est
mal rempli, le build s'arrête et indique le fichier et le champ en cause.

## Les CV en PDF (`public/cv/`)

Le bouton « Télécharger le CV » du bloc Profil propose FR, EN et JP. Une langue devient cliquable dès que
son fichier existe, avec ces noms exacts :

- `public/cv/cv-fr.pdf`
- `public/cv/cv-en.pdf`
- `public/cv/cv-ja.pdf`

Les autres langues s'affichent grisées avec « bientôt ». Le fichier téléchargé est renommé
automatiquement (`CV-Gwilherm-LE-GALLIC-FR.pdf`). Pense à remplacer le PDF quand tu modifies ton CV.

## Les liens de contact (`src/data/contact.ts`)

```ts
export const contacts: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/Giremuu', handle: 'Giremuu' },
  // label  = nom affiché sur le bouton
  // href   = adresse (null = bouton grisé « à compléter »)
  // handle = petit texte sous le nom (facultatif)
];
```

Chaque ligne crée un bouton sur la page Contact. L'ordre des lignes est
l'ordre d'affichage. Pas d'e-mail en clair, pour éviter le spam et les robots.

## Les textes d'interface (`src/i18n/ui.ts`)

Un dictionnaire par langue, avec les mêmes clés :

```ts
const fr = {
  'nav.cv': 'CV',
  'home.intro': ["Oh, un visiteur ? …"],   // texte du dialogue d'accueil
  'contact.intro': 'Tu veux me contacter ? …',
  …
};
const en: Dict = { 'nav.cv': 'Resume', … };
```

Si une clé manque en anglais, TypeScript le signale (`npx astro check`).

## Ajouter un projet ou un jeu

1. Copie un modèle de [modeles-fiches/](modeles-fiches/) dans `src/content/projects/fr/`.
   Le **nom du fichier donne l'adresse** : `mon-outil.md` → `/projets/mon-outil/` et `/en/projects/mon-outil/`.
2. Remplis l'en-tête (entre les `---`) :

   ```yaml
   title: suzune_check
   kind: tool                  # game (page Jeux) | tool ou script (page Projets)
   description: Résumé court, 160 caractères max.
   icon: ◆                     # caractère affiché dans la case
   tags: [Ansible, Linux]
   status: stable              # wip | stable | archived
   repo: https://github.com/…  # facultatif
   demo: https://…             # facultatif
   date: 2026-05-01            # sert au tri (plus récent en premier)
   draft: false                # true = visible en local, caché en ligne
   playable: false             # jeux web uniquement (voir 07 · Mise en ligne)
   ```
3. Écris le contenu en Markdown sous l'en-tête : titres `##`, listes, `code`, liens…
4. Fais la version anglaise dans `src/content/projects/en/` **avec le même nom de fichier**. Sans traduction,
   la page anglaise affiche la version française avec un bandeau.

Exemple réel : `src/content/projects/fr/suzune-check.md`.

Dès qu'une fiche existe, l'écran « Bientôt disponible » de la page concernée est remplacé par la liste.
