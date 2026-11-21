/**
 * Musique de fond : thème chiptune original, généré en direct via Web Audio
 * (aucun fichier). Coupée par défaut ; préférence mémorisée par visiteur.
 *
 * La boucle fait 8 mesures en la mineur pentatonique : Am – F – G – Em.
 * Pour modifier le morceau : BPM, CHORDS (accords) et MELODY (mélodie) plus bas.
 * Les notes sont en numéros MIDI : 57 = La3, 60 = Do4, 69 = La4, 72 = Do5…
 */
import { getAudioContext } from './sound';

const KEY = 'girelab:music';
const BPM = 84;
const VOLUME = 0.5; // volume général de la musique (0 à 1)
const STEPS_PER_BAR = 8; // croches
const BARS = 8;
const LOOP = STEPS_PER_BAR * BARS;

// Un accord par groupe de 2 mesures : [basse, notes d'arpège…]
const CHORDS: { bass: number; arp: number[] }[] = [
  { bass: 45, arp: [57, 60, 64, 69] }, // Am
  { bass: 41, arp: [53, 57, 60, 65] }, // F
  { bass: 43, arp: [55, 59, 62, 67] }, // G
  { bass: 40, arp: [52, 55, 59, 64] }, // Em
];
const ARP_PATTERN = [0, 2, 1, 3, 2, 1, 3, 1];

// Mélodie : [pas (croche), note MIDI, durée en croches]
const MELODY: [number, number, number][] = [
  [0, 76, 2], [2, 74, 1], [3, 72, 1], [4, 69, 3],
  [8, 72, 1], [9, 74, 1], [10, 76, 4],
  [16, 81, 2], [18, 79, 1], [19, 76, 1], [20, 74, 2], [22, 72, 2],
  [24, 74, 6],
  [32, 67, 1], [33, 69, 1], [34, 72, 2], [36, 74, 2], [38, 76, 2],
  [40, 74, 1], [41, 72, 1], [42, 74, 4],
  [48, 76, 2], [50, 79, 2], [52, 76, 1], [53, 74, 1], [54, 72, 2],
  [56, 67, 2], [58, 69, 6],
];

const stepDur = 60 / BPM / 2;
const freq = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

let master: GainNode | null = null;
let timer: number | undefined;
let nextTime = 0;
let step = 0;
let pass = 0;
let noise: AudioBuffer | null = null;

export function isMusicOn(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

function save(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* stockage indisponible */
  }
}

/** Chaîne de sortie : volume → filtre doux → écho léger. */
function output(ctx: AudioContext): GainNode {
  if (master) return master;
  master = ctx.createGain();
  master.gain.value = 0;
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 2600;
  const delay = ctx.createDelay();
  delay.delayTime.value = stepDur * 3;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.28;
  const wet = ctx.createGain();
  wet.gain.value = 0.35;
  master.connect(lowpass);
  lowpass.connect(ctx.destination);
  lowpass.connect(delay);
  delay.connect(feedback).connect(delay);
  delay.connect(wet).connect(ctx.destination);
  return master;
}

function note(ctx: AudioContext, midi: number, t: number, dur: number, type: OscillatorType, vol: number) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq(midi);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(vol * 0.5, t + dur * 0.5);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master!);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function hat(ctx: AudioContext, t: number) {
  if (!noise) {
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 7000;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.05, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  src.connect(hp).connect(g).connect(master!);
  src.start(t);
}

function playStep(ctx: AudioContext, s: number, t: number) {
  const bar = Math.floor(s / STEPS_PER_BAR);
  const inBar = s % STEPS_PER_BAR;
  const chord = CHORDS[Math.floor(bar / 2) % CHORDS.length];

  // arpège
  note(ctx, chord.arp[ARP_PATTERN[inBar]], t, stepDur * 0.9, 'square', 0.035);
  // basse : temps 1 et 3, quinte en fin de mesure
  if (inBar === 0) note(ctx, chord.bass, t, stepDur * 3.5, 'triangle', 0.22);
  if (inBar === 4) note(ctx, chord.bass, t, stepDur * 2, 'triangle', 0.18);
  if (inBar === 6) note(ctx, chord.bass + 7, t, stepDur * 2, 'triangle', 0.15);
  // charleston sur les contretemps
  if (inBar % 2 === 1) hat(ctx, t);
  // mélodie (un tour sur deux, elle ne revient qu'à la 5e mesure pour respirer)
  if (pass % 2 === 0 || bar >= 4) {
    for (const [at, midi, len] of MELODY) {
      if (at === s) note(ctx, midi, t, stepDur * len, 'triangle', 0.16);
    }
  }
}

function schedule() {
  const ctx = getAudioContext();
  // onglet en arrière-plan : on se recale au lieu de rattraper les notes manquées
  if (nextTime < ctx.currentTime - 0.2) nextTime = ctx.currentTime + 0.05;
  while (nextTime < ctx.currentTime + 0.15) {
    playStep(ctx, step, nextTime);
    nextTime += stepDur;
    step = (step + 1) % LOOP;
    if (step === 0) pass++;
  }
}

function play() {
  const ctx = getAudioContext();
  if (ctx.state !== 'running') {
    // son bloqué par le navigateur : on attend un clic / une touche
    const unlock = () => {
      document.removeEventListener('pointerdown', unlock, true);
      document.removeEventListener('keydown', unlock, true);
      void ctx.resume().then(() => isMusicOn() && play());
    };
    document.addEventListener('pointerdown', unlock, true);
    document.addEventListener('keydown', unlock, true);
    return;
  }
  if (timer !== undefined) return;
  const out = output(ctx);
  out.gain.cancelScheduledValues(ctx.currentTime);
  out.gain.setTargetAtTime(VOLUME, ctx.currentTime, 0.4); // fondu d'entrée
  nextTime = ctx.currentTime + 0.1;
  timer = window.setInterval(schedule, 25);
}

function stop() {
  if (timer === undefined) return;
  const ctx = getAudioContext();
  window.clearInterval(timer);
  timer = undefined;
  master?.gain.setTargetAtTime(0, ctx.currentTime, 0.15); // fondu de sortie
}

export function setMusic(on: boolean) {
  save(on);
  if (on) play();
  else stop();
}

/** À appeler au chargement : relance la musique si le visiteur l'avait activée. */
export function resumeMusic() {
  if (isMusicOn()) play();
}
