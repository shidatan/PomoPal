import { MusicTrackRefContext } from "@/context/MusicTrackRefContext";
import { fadeInAudio, fadeOutAudio } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { TimerStateContext } from "../context/TimerStateContext";

export const useMusicPlayer = () => {
  const { musicTrackRef } = useContext(MusicTrackRefContext);
  const { timerState } = useContext(TimerStateContext);

  const {
    isPlaying,
    isWork,
    intervalCount,
    currentInterval,
    totalWorkSeconds,
    remainingWorkSeconds,
    totalBreakSeconds,
    remainingBreakSeconds,
    musicTrack,
  } = timerState;

  const remaining = isWork ? remainingWorkSeconds : remainingBreakSeconds;
  const total = isWork ? totalWorkSeconds : totalBreakSeconds;
  const progressBarWidth = Math.max(0, ((remaining / total) * 100).toFixed(2));
  const musicTrackNameWithoutExtension = musicTrack?.name?.replace(
    /\.mp3$/,
    "",
  );

  // Initialize audio object when the music track changes
  useEffect(() => {
    if (musicTrack) {
      const objectUrl = URL.createObjectURL(musicTrack);
      musicTrackRef.current = new Audio(objectUrl);
      musicTrackRef.current.loop = true;
    }

    return () => {
      if (musicTrackRef.current) {
        musicTrackRef.current.pause();
        URL.revokeObjectURL(musicTrackRef.current.src);
        musicTrackRef.current = null;
      }
    };
  }, [musicTrack]);

  // Manage audio playback during the work interval
  useEffect(() => {
    if (!musicTrackRef.current) return;

    let timeout;

    const shouldPlayMusic = isPlaying && isWork && remainingWorkSeconds > 0;

    if (shouldPlayMusic) {
      const playAudio = () => {
        musicTrackRef.current
          .play()
          .catch((err) => console.error("Audio playback failed:", err));
      };

      // Begin fading out audio near the end of the work session
      if (remainingWorkSeconds === 2) {
        fadeOutAudio(musicTrackRef);
      }
      // Delay playback to prevent overlapping with the starting bell
      else if (remainingWorkSeconds === totalWorkSeconds) {
        timeout = setTimeout(() => fadeInAudio(musicTrackRef), 4000);
      }
      // Delay playback to prevent overlap with time-up sound
      else if (remainingWorkSeconds === totalWorkSeconds - 1) {
        timeout = setTimeout(() => fadeInAudio(musicTrackRef), 500);
      }
      // Play immediately for all other moments
      else {
        fadeInAudio(musicTrackRef);
      }
    }
    // Pause audio if timer is not running
    else if (!isPlaying) {
      musicTrackRef.current.pause();
    }

    return () => {
      clearTimeout(timeout);

      if (musicTrackRef.current && !isPlaying) {
        musicTrackRef.current.pause();
      }
    };
  }, [isPlaying, isWork, totalWorkSeconds, remainingWorkSeconds]);

  // Reset audio after final break interval ends
  useEffect(() => {
    const shouldResetAudio =
      !isWork &&
      currentInterval >= intervalCount &&
      remainingWorkSeconds === 0 &&
      musicTrackRef.current;

    if (shouldResetAudio) {
      musicTrackRef.current.currentTime = 0;
    }
  }, [
    isWork,
    currentInterval,
    intervalCount,
    remainingWorkSeconds,
    musicTrackRef,
  ]);

  return {
    progressBarWidth,
    musicTrackNameWithoutExtension,
  };
};
