/**
 * Liens affichés sur la page Contact, dans cet ordre.
 * Ajouter un lien = ajouter une ligne : { label, href, handle (facultatif, affiché à droite) }.
 * `href: null` = pas encore renseigné (affiché comme « à compléter »).
 */
export interface ContactLink {
  label: string;
  href: string | null;
  handle?: string;
}

export const contacts: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/Giremuu', handle: 'Giremuu' },
  { label: 'LinkedIn', href: 'https://fr.linkedin.com/in/gwilherm-le-gallic', handle: 'gwilherm-le-gallic' },
  { label: 'Root-Me', href: 'https://www.root-me.org/Giremu-1079096?inc=score&lang=fr', handle: 'Giremu' },
];
