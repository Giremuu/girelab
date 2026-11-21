/**
 * Effet « machine à écrire » des boîtes de dialogue (texte lettre par lettre + blips).
 * Utilisé par src/components/DialogBox.astro.
 */
import { blip } from './sound';

export interface Typing {
  /** Affiche tout le texte immédiatement. */
  finish(): void;
  /** Stoppe sans compléter. */
  cancel(): void;
  readonly done: boolean;
}

/**
 * Écrit `text` lettre par lettre dans `el`, avec un blip sonore et une pause
 * sur la ponctuation. Respecte prefers-reduced-motion.
 */
export function typewrite(
  el: HTMLElement,
  text: string,
  { speed = 28, sound = true, onDone }: { speed?: number; sound?: boolean; onDone?: () => void } = {},
): Typing {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;
  let timer: number | undefined;
  let done = false;

  const complete = () => {
    window.clearTimeout(timer);
    el.textContent = text;
    if (!done) {
      done = true;
      onDone?.();
    }
  };

  const step = () => {
    const ch = text[i++];
    el.textContent = text.slice(0, i);
    if (sound && ch?.trim() && i % 2) blip();
    if (i >= text.length) return complete();
    const pause = /[.,!?…:]/.test(ch) && text[i] === ' ' ? speed * 6 : speed;
    timer = window.setTimeout(step, pause);
  };

  el.textContent = '';
  if (reduce || !text) complete();
  else step();

  return {
    finish: complete,
    cancel: () => {
      window.clearTimeout(timer);
      done = true;
    },
    get done() {
      return done;
    },
  };
}
