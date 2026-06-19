import { writable, derived } from 'svelte/store';

export const masterVolume = writable(75);
export const globalTracks = writable([]);
export const activeIndex = writable(0);
export const isPlaying = writable(false);
export const currentTime = writable(0);
export const duration = writable(0);

// Calcula dinámicamente cuál es la pista actual basada en el índice
export const activeTrack = derived(
  [globalTracks, activeIndex],
  ([$globalTracks, $activeIndex]) => $globalTracks[$activeIndex] || {}
);