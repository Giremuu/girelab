# 08 · Dépannage

## Le serveur de dev affiche une erreur alors que le code est bon

Ça arrive après un changement de **structure** : schéma du CV, fichier déplacé ou renommé. Le serveur garde
l'ancienne version en cache.

1. Dans le terminal de `npm run dev` : **Ctrl+C**, puis relancer `npm run dev`.
2. Si ça persiste : `rm -rf .astro node_modules/.vite && npm run dev`.

Pour savoir si le problème vient vraiment du code : `npm run build`. Si le build passe, c'est le cache.

## « Dev server already running »

Un serveur tourne déjà. L'arrêter dans son terminal (Ctrl+C), ou `npx astro dev stop` s'il a été lancé
en arrière-plan.

## Le build échoue sur un fichier YAML

| Message | Cause | Correction |
|---|---|---|
| `Nested mappings are not allowed in compact mappings` | Un texte contient « : » sans guillemets | `- "Projet : migration MDM"` |
| `... failed to parse` + numéro de ligne | Indentation incorrecte ou tabulation | Espaces uniquement, aligner sur la ligne du dessus |
| `Expected string, received number` | Une année sans guillemets | `end: '2025'` |
| `Required` sur un champ | Champ obligatoire manquant | Voir le schéma dans `src/content.config.ts` |

## Un élément a disparu après un changement de couleur

Une variable CSS a été supprimée de `tokens.css` alors qu'elle était encore utilisée. Chercher son nom dans
tout le projet (Ctrl+Shift+F, par exemple `--shu`) et la remplacer par une variable existante.

## Pas de son / pas de musique

- Les boutons ♪ et ♫ du header sont **coupés par défaut** : vérifier qu'ils sont sur ON.
- Après un rechargement de page, le navigateur bloque le son jusqu'au premier clic ou à la première touche
  (règle d'autoplay). C'est normal.
- L'onglet ou le système est peut-être en sourdine.

## Le texte d'accueil ne s'écrit plus lettre par lettre

C'est voulu : il a déjà été lu pendant cette visite. Ouvre un nouvel onglet pour le revoir s'écrire.

## Vérifier que tout est sain

```sh
npm run build        # le site se génère sans erreur
npx astro check      # aucune erreur TypeScript
npm run preview      # tester le résultat final sur http://localhost:4321
```
