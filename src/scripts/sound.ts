/**
 * Sons d'interface générés via Web Audio (aucun fichier audio).
 * Coupés par défaut ; la préférence est mémorisée par visiteur.
 */
const KEY = 'girelab:sound';
let ctx: AudioContext | null = null;

export function isSoundOn(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

export function setSound(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* stockage indisponible : on garde juste l'état de la page */
  }
  document.documentElement.dataset.sound = on ? 'on' : 'off';
}

/** Contexte audio partagé (sons d'interface + musique). */
export function getAudioContext(): AudioContext {
  ctx ??= new AudioContext();
  return ctx;
}

function audio(): AudioContext | null {
  if (!isSoundOn()) return null;
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/**
 * true si le son est activé mais encore bloqué par le navigateur
 * (aucun clic / touche depuis le chargement : règle d'autoplay).
 */
export function soundBlocked(): boolean {
  if (!isSoundOn()) return false;
  ctx ??= new AudioContext();
  return ctx.state !== 'running';
}

/** À appeler pendant un clic / une touche pour débloquer le son. */
export function unlockSound() {
  ctx ??= new AudioContext();
  void ctx.resume();
}

function tone(freq: number, duration: number, type: OscillatorType = 'square', volume = 0.04) {
  const a = audio();
  if (!a) return;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, a.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + duration);
  osc.connect(gain).connect(a.destination);
  osc.start();
  osc.stop(a.currentTime + duration);
}

/** Petit « blip » de dialogue ; légère variation de hauteur pour rester vivant. */
export function blip(pitch = 520) {
  tone(pitch + Math.random() * 40 - 20, 0.045);
}

/** Déplacement du curseur dans un menu. */
export function move() {
  tone(880, 0.03, 'square', 0.03);
}

/** Validation d'un choix. */
export function confirm() {
  tone(660, 0.05);
  setTimeout(() => tone(990, 0.08), 50);
}
