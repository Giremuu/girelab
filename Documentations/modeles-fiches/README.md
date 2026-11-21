# Modèles de fiches

Des fiches d'exemple prêtes à copier pour créer un projet ou un jeu.

| Modèle | Type | Apparaît sur |
|---|---|---|
| `fr/exemple-outil.md` | `kind: tool` | Page Projets, bloc Outils |
| `fr/exemple-script.md` | `kind: script` | Page Projets, bloc Scripts |
| `fr/exemple-jeu.md` | `kind: game` | Page Jeux |

Les versions anglaises sont dans `en/`.

## Utilisation

1. Copier le modèle dans `src/content/projects/fr/` et le renommer. Le **nom du fichier donne l'adresse** :
   `mon-outil.md` → `/projets/mon-outil/`.
2. Remplir l'en-tête et écrire le contenu en Markdown.
3. Faire la version anglaise dans `src/content/projects/en/`, avec le même nom de fichier.

Exemple réel et complet : `src/content/projects/fr/suzune-check.md`.

Le détail de chaque champ est dans [03 · Modifier le contenu](../03-contenu.md#ajouter-un-projet-ou-un-jeu).
