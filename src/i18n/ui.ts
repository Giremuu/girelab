/**
 * Tous les textes d'interface du site, par langue (menus, boutons, dialogues, titres).
 * Le contenu « métier » (CV, projets, liens) est ailleurs : src/data/ et src/content/.
 */
import { defaultLang, type Lang } from './config';

/**
 * Textes d'interface. Le français est la référence : chaque autre langue
 * doit fournir les mêmes clés (TypeScript le vérifie).
 */
const fr = {
  'site.description': 'girelab — CV, projets et jeux de Giremuu.',
  'nav.home': 'Accueil',
  'nav.cv': 'CV',
  'nav.games': 'Jeux',
  'nav.projects': 'Projets',
  'nav.contact': 'Contact',
  'nav.label': 'Navigation',
  'skip': 'Aller au contenu',
  'footer.legal': 'Mentions légales',
  'sound.label': 'Son',
  'music.label': 'Musique',
  'lang.label': 'Langue',

  // Accueil
  'home.h1': 'girelab — le labo de Giremuu',
  'home.intro': [
    "Oh, un visiteur ? Ça faisait longtemps... Bienvenue au Girelab ! Je range ici tout ce que je construis et qui mérite d'être accessible : des outils, des projets, mon CV... et des jeux !",
  ],
  'home.skip': 'Passer ≫',
  'home.start': '▶ Clique ou appuie sur une touche…',
  'home.menu': 'Que veux-tu faire ?',
  'home.cmd.cv': 'CV',
  'home.cmd.games': 'JEUX',
  'home.cmd.projects': 'PROJETS',
  'home.cmd.contact': 'CONTACT',
  'home.hint': 'Souris ou ← → pour bouger le cœur · Clic ou Entrée pour valider',

  // CV
  'cv.title': 'Qui suis-je ?',
  'cv.profile': 'Profil',
  'cv.skills': 'Skills',
  'cv.learning': 'En apprentissage',
  'cv.languages': 'Langues',
  'cv.download': 'Télécharger le CV',
  'cv.soon': 'bientôt',
  'cv.quests': 'Expériences',
  'cv.training': 'Diplômes et certifications',
  'cv.now': "aujourd'hui",
  'cv.description': 'Fiche de personnage : compétences, expériences et formation.',

  // Projets
  'games.title': 'Jeux',
  'games.description': 'Les jeux développés par Giremuu.',
  'soon.title': 'Bientôt disponible',
  'projects.soon': "Les premiers projets arrivent : outils, scripts et rôles d'automatisation. Reviens bientôt !",
  'games.soon': 'Les premiers jeux sont en préparation. Reviens bientôt !',
  'projects.title': 'Projets',
  'projects.tools': 'Outils',
  'projects.scripts': 'Scripts',
  'projects.description': 'Projets, outils et scripts infra, réseau et dev de Giremuu.',
  'inventory': 'Inventaire',
  'inventory.empty': "L'inventaire est vide… pour l'instant.",
  'status.wip': 'EN COURS',
  'status.stable': 'STABLE',
  'status.archived': 'ARCHIVÉ',
  'project.info': 'Infos',
  'project.status': 'Statut',
  'project.tags': 'Tags',
  'project.date': 'Date',
  'project.back': '« Retour',
  'project.source': '▸ Code source',
  'project.demo': '▸ Démo',
  'project.play': 'Jouer à',
  'project.fallback': 'Cette fiche n’est pas encore traduite : version française affichée.',

  // Contact
  'contact.description': 'Me contacter.',
  'contact.intro': 'Tu veux me contacter ? Je répondrai dès que possible !',
  'contact.todo': 'à compléter',

  // 404
  'notfound.text': "Il n'y a rien ici. Juste le bruit du vent dans les bambous.",
  'notfound.back': "♦ Retourner à l'accueil",
};

type Dict = { [K in keyof typeof fr]: (typeof fr)[K] extends string[] ? string[] : string };

const en: Dict = {
  'site.description': 'girelab — resume, projects and games by Giremuu.',
  'nav.home': 'Home',
  'nav.cv': 'Resume',
  'nav.games': 'Games',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.label': 'Navigation',
  'skip': 'Skip to content',
  'footer.legal': 'Legal notice',
  'sound.label': 'Sound',
  'music.label': 'Music',
  'lang.label': 'Language',

  'home.h1': "girelab — Giremuu's lab",
  'home.intro': [
    "Oh, a visitor? It's been a while... Welcome to Girelab! This is where I keep everything I build that deserves to be shared: tools, projects, my resume... and games!",
  ],
  'home.skip': 'Skip ≫',
  'home.start': '▶ Click or press any key…',
  'home.menu': 'What will you do?',
  'home.cmd.cv': 'RESUME',
  'home.cmd.games': 'GAMES',
  'home.cmd.projects': 'PROJECTS',
  'home.cmd.contact': 'CONTACT',
  'home.hint': 'Mouse or ← → to move the heart · Click or Enter to confirm',

  'cv.title': 'Who am I?',
  'cv.profile': 'Profile',
  'cv.skills': 'Skills',
  'cv.learning': 'Learning',
  'cv.languages': 'Languages',
  'cv.download': 'Download resume',
  'cv.soon': 'soon',
  'cv.quests': 'Experience',
  'cv.training': 'Degrees & certifications',
  'cv.now': 'now',
  'cv.description': 'Character sheet: skills, experience and education.',

  'games.title': 'Games',
  'games.description': 'Games made by Giremuu.',
  'soon.title': 'Coming soon',
  'projects.soon': 'The first projects are on their way: tools, scripts and automation roles. Check back soon!',
  'games.soon': 'The first games are in the works. Check back soon!',
  'projects.title': 'Projects',
  'projects.tools': 'Tools',
  'projects.scripts': 'Scripts',
  'projects.description': 'Infra, network and dev projects, tools and scripts by Giremuu.',
  'inventory': 'Inventory',
  'inventory.empty': 'The inventory is empty… for now.',
  'status.wip': 'IN PROGRESS',
  'status.stable': 'STABLE',
  'status.archived': 'ARCHIVED',
  'project.info': 'Info',
  'project.status': 'Status',
  'project.tags': 'Tags',
  'project.date': 'Date',
  'project.back': '« Back',
  'project.source': '▸ Source code',
  'project.demo': '▸ Demo',
  'project.play': 'Play',
  'project.fallback': 'This page is not translated yet: showing the French version.',

  'contact.description': 'Get in touch.',
  'contact.intro': "Want to reach me? I'll get back to you as soon as possible!",
  'contact.todo': 'to fill in',

  'notfound.text': 'Nothing here. Just the wind in the bamboo.',
  'notfound.back': '♦ Back to home',
};

const dictionaries: Record<Lang, Dict> = { fr, en };
export type UiKey = keyof typeof fr;

export function useTranslations(lang: Lang) {
  const dict = dictionaries[lang] ?? dictionaries[defaultLang];
  return function t<K extends UiKey>(key: K): Dict[K] {
    return dict[key] ?? dictionaries[defaultLang][key];
  };
}
