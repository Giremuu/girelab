# 07 · Mise en ligne

## Le déploiement automatique

`.github/workflows/deploy.yml` s'exécute à chaque `git push` sur `main` :

1. **build** : installe les dépendances et lance `astro build` (action `withastro/action`, Node 24) ;
2. **deploy** : publie `dist/` sur GitHub Pages, **uniquement si** la variable de repo
   `PAGES_ENABLED` vaut `true`.

Tant que cette variable n'existe pas, le build tourne (ça vérifie que tout compile) mais rien n'est publié.

## Étapes pour mettre le site en ligne

1. **Rendre le repo public** (Settings → General → Danger Zone → Change visibility).
   GitHub Pages est gratuit pour les repos publics. Pour un repo privé, il faut GitHub Pro.
   Avant de le rendre public, vérifie qu'aucune information sensible n'est commitée.
2. **Activer Pages** : Settings → Pages → *Source* : **GitHub Actions**.
3. **Créer la variable** : Settings → Secrets and variables → Actions → onglet *Variables* →
   `PAGES_ENABLED` = `true`.
4. **Pousser sur `main`** (ou relancer le workflow depuis l'onglet Actions).

À ce stade, GitHub publie le site sur `https://giremuu.github.io/girelab/`, **mais il s'y affiche mal**
(styles et images manquants). Le site est conçu pour être servi à la racine d'un domaine, pas dans un
sous-dossier `/girelab/`. C'est normal : il s'affiche correctement dès que girelab.dev est branché
(section suivante). Fais donc les deux à la suite.

## Brancher girelab.dev (Cloudflare)

1. **GitHub** : Settings → Pages → *Custom domain* : `girelab.dev`. Avec un déploiement par Actions, le
   fichier `CNAME` n'est pas nécessaire.
2. **Conseillé** : dans les settings de ton **compte** GitHub → Pages → *Verified domains*, ajoute
   `girelab.dev`. GitHub donne un enregistrement TXT à créer chez Cloudflare (protection contre le vol de domaine).
3. **Cloudflare → DNS** :

   | Type | Nom | Valeur |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153` |
   | CNAME | `www` | `giremuu.github.io` |

   Laisse ces enregistrements en **DNS only (nuage gris)** au début, sinon GitHub ne peut pas générer le
   certificat HTTPS.
4. Une fois le certificat émis, coche **Enforce HTTPS** dans Settings → Pages.
5. **Proxy Cloudflare (nuage orange)** : facultatif. Si tu l'actives, mets SSL/TLS en **Full (strict)**,
   **jamais Flexible** (boucle de redirections).

Le domaine est déjà déclaré dans `astro.config.mjs` (`site: 'https://girelab.dev'`). Il sert pour le
sitemap, les liens canoniques et les `hreflang`.

## Limites de GitHub Pages

| Limite | Valeur |
|---|---|
| Taille du site | 1 Go |
| Bande passante | ~100 Go / mois (limite souple) |
| Fichier unique | 100 Mo |
| En-têtes HTTP personnalisés | Impossible |

## Ajouter un jeu jouable

Une fiche avec `kind: game` et `playable: true` embarque le jeu dans une `<iframe>` depuis
`/games/<nom-de-la-fiche>/index.html`.

Organisation prévue :

1. un **repo par jeu** (Phaser, KAPLAY ou Godot), qui publie son build web ;
2. dans `deploy.yml`, avant le build Astro, une étape télécharge ce build et le copie dans
   `public/games/<nom>/` (l'emplacement est déjà marqué en commentaire dans le workflow) ;
3. le jeu est servi sur `girelab.dev/games/<nom>/`, avec la fiche autour.

Pour Godot, exporte en **single-thread** (Godot 4.3+) : la version multi-thread exige des en-têtes HTTP
(COOP / COEP) que GitHub Pages ne permet pas de définir.
