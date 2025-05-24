import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function fadeOutAudio(musicTrackRef, step = 0.05, interval = 100) {
  if (!musicTrackRef.current) return;

  const audio = musicTrackRef.current;

  const fadeOutInterval = setInterval(() => {
    if (audio.volume > step) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      clearInterval(fadeOutInterval);
      audio.pause();
      audio.volume = 1; // Reset volume for next play
    }
  }, interval);
}
