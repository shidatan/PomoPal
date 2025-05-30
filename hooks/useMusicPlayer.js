import { MusicTrackRefContext } from "@/context/MusicTrackRefContext";
import { fadeOutAudio } from "@/lib/utils";
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
    musicTrack,
  } = timerState;

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

      // Delay playback to prevent overlapping with the starting bell
      if (remainingWorkSeconds === totalWorkSeconds) {
        timeout = setTimeout(playAudio, 4500);
      }
      // Delay playback to prevent overlap with time-up sound
      else if (remainingWorkSeconds === totalWorkSeconds - 1) {
        timeout = setTimeout(playAudio, 500);
      }
      // Play immediately for all other moments
      else {
        playAudio();
      }

      // Begin fading out audio near the end of the work session
      if (remainingWorkSeconds === 2) {
        fadeOutAudio(musicTrackRef);
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
};
