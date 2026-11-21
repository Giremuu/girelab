# 05 · Interactions

## Boîte de dialogue (`DialogBox.astro` + `src/scripts/typewriter.ts`)

1. Le cadre s'ouvre avec une animation en escalier (GSAP).
2. Le texte s'écrit lettre par lettre, avec une petite pause sur la ponctuation et un « blip » toutes les deux lettres.
3. Clic, Entrée, Espace ou Z : termine le texte. « Passer », Échap ou X : affiche tout d'un coup.
4. À la fin, le composant émet l'événement `dialog:done`, qui ouvre le menu au cœur.

Points particuliers :

- **Déjà lu** : si le visiteur revient sur la page pendant la même visite, le texte s'affiche d'un coup.
  C'est mémorisé par dialogue (`girelab:intro-seen:home`, `…:contact`) dans le *sessionStorage* de l'onglet.
- **Son bloqué par le navigateur** : les navigateurs interdisent le son avant une première action de
  l'utilisateur (règle d'*autoplay*). Si le son est activé, la boîte affiche « ▶ Clique ou appuie sur une
  touche… » et le texte démarre à la première action.

Vitesse de frappe : `speed = 28` (millisecondes par caractère) dans `src/scripts/typewriter.ts`.

## Menu au cœur (`HeartMenu.astro`)

- **Souris** : le cœur remplace le curseur (`cursor: none`) et suit le pointeur, en restant bloqué dans le
  cadre. Le bouton sous le cœur s'allume. Un clic valide.
- **Clavier** : les flèches font sauter le cœur d'un bouton à l'autre (haut / bas changent de ligne),
  Entrée ou Z valide.
- **Tactile** : le cœur saute là où on touche, puis la redirection se fait.
- **Validation** : le cœur pulse, le bouton clignote, puis :
  - page du site : navigation interne ;
  - lien externe : ouverture dans un nouvel onglet ;
  - `mailto:` : ouverture de la messagerie.
- **Sans JavaScript** : les boutons restent de simples liens.

## Sons et musique (`src/scripts/sound.ts`, `src/scripts/music.ts`)

Tout est **synthétisé en direct** avec l'API Web Audio : aucun fichier audio, 0 Ko à télécharger.

| | Sons d'interface | Musique |
|---|---|---|
| Fichier | `sound.ts` | `music.ts` |
| Contenu | `blip()` (dialogue), `move()` (curseur), `confirm()` (validation) | Boucle chiptune de 8 mesures en la mineur pentatonique (Am – F – G – Em) : arpège, basse, charleston, mélodie, écho |
| Bouton | ♪ Son | ♫ Musique |
| Mémorisation | `localStorage` `girelab:sound` | `localStorage` `girelab:music` |

Les deux sont **coupés par défaut**. La musique continue sans coupure quand on change de page, grâce à la
navigation sans rechargement.

Pour modifier le morceau, tout est en haut de `music.ts` :

- `BPM` (tempo), `VOLUME` (0 à 1) ;
- `CHORDS` (accords : note de basse + notes d'arpège) ;
- `MELODY` (`[pas, note, durée]` : un pas = une croche, les notes sont en numéros MIDI, 69 = La4).

## Fond animé (`Fireflies.astro`)

Un `<canvas>` en basse résolution (1 pixel du canvas = 4 pixels écran), agrandi sans lissage pour garder
l'aspect pixel art. Il dessine des **lucioles** dorées qui scintillent et des **pétales** qui tombent en
ondulant. Le nombre de particules s'adapte à la taille de l'écran. Le canvas est conservé entre les pages
(`transition:persist`).

## Transitions et apparitions

- **Changement de page** : fondu au noir en escalier, défini dans `Base.astro` (`zone`) et `global.css`
  (`@keyframes zone-out / zone-in`).
- **Apparition au scroll** : tout élément avec l'attribut `data-reveal` apparaît en cascade quand il entre
  à l'écran (`src/scripts/reveal.ts`).

## Accessibilité

- Réglage système « réduire les animations » respecté (`prefers-reduced-motion`) : animations coupées,
  texte affiché d'un coup.
- Tout est utilisable au clavier, avec un lien « Aller au contenu » en premier élément focusable.
- Le texte des dialogues est lu par les lecteurs d'écran (`aria-live`).
