import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function fadeOutAudio(musicTrackRef, step = 0.09, interval = 100) {
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

export function fadeInAudio(musicTrackRef, step = 0.070, interval = 100) {
  if (!musicTrackRef.current) return;

  const audio = musicTrackRef.current;

  if (audio.paused) {
    audio.volume = 0;
    audio.play();
  }

  const fadeInInterval = setInterval(() => {
    if (audio.volume < 1 - step) {
      audio.volume = Math.min(audio.volume + step, 1);
    } else {
      audio.volume = 1; // Ensure it's exactly 1
      clearInterval(fadeInInterval);
    }
  }, interval);
}
