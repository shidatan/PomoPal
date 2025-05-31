import { INITIAL_TIMER_STATE } from "@/lib/constants";
import { useContext, useEffect, useRef } from "react";
import { toast } from "sonner";
import { TimerStateContext } from "../context/TimerStateContext";

export const useTimer = () => {
  const { timerState, setTimerState } = useContext(TimerStateContext);

  const popmusicTrackRef = useRef(null);
  const bellmusicTrackRef = useRef(null);
  const timeUpMusicTrackRef = useRef(null);
  const timeUPlaybackCountRef = useRef(0);
  const endmusicTrackRef = useRef(null);
  const intervalRef = useRef(null);

  const {
    isPlaying,
    countdown,
    isWork,
    intervalCount,
    currentInterval,
    totalWorkSeconds,
    totalBreakSeconds,
    remainingWorkSeconds,
    remainingBreakSeconds,
    musicTrack,
  } = timerState;

  // Load audio files on component mount
  useEffect(() => {
    popmusicTrackRef.current = new Audio("/music/pop.mp3");
    bellmusicTrackRef.current = new Audio("/music/boxing_bell.mp3");
    timeUpMusicTrackRef.current = new Audio("/music/time_up.mp3");
    endmusicTrackRef.current = new Audio("/music/pizzicato.mp3");
  }, []);

  // Run countdown before the first work session
  useEffect(() => {
    const shouldStartCountdown =
      isPlaying &&
      isWork &&
      currentInterval === 1 &&
      remainingWorkSeconds === totalWorkSeconds;

    if (!shouldStartCountdown) {
      // Stop countdown if the timer is paused
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      // Pause music track if the timer is paused while music is playing
      bellmusicTrackRef.current?.pause();
      popmusicTrackRef.current?.pause();

      return;
    }

    const tick = () => {
      setTimerState((prev) => {
        if (prev.countdown <= 1) {
          // Play bell at end of countdown
          if (bellmusicTrackRef.current) {
            bellmusicTrackRef.current.play().catch((err) => {
              console.error("Failed to play bell sound:", err);
            });
          }

          // Stop the interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          return {
            ...prev,
            countdown: 0,
          };
        }

        // Play pop sound on each tick
        if (popmusicTrackRef.current) {
          popmusicTrackRef.current.currentTime = 0;
          popmusicTrackRef.current.play().catch((err) => {
            console.error("Failed to play pop sound:", err);
          });
        }

        return {
          ...prev,
          countdown: prev.countdown - 1,
        };
      });
    };

    // Avoid using setInterval directly which would otherwise
    // desynchronize the pop sound and countdown display
    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      bellmusicTrackRef.current?.pause();
      popmusicTrackRef.current?.pause();
    };
  }, [isPlaying, isWork, currentInterval]);

  // Decrease remaining seconds every second during active timer
  useEffect(() => {
    if (!isPlaying || countdown >= 1) return;

    const interval = setInterval(() => {
      setTimerState((prev) => {
        if (prev.isWork) {
          return {
            ...prev,
            remainingWorkSeconds: Math.max(prev.remainingWorkSeconds - 1, 0),
          };
        } else {
          return {
            ...prev,
            remainingBreakSeconds: Math.max(prev.remainingBreakSeconds - 1, 0),
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, countdown]);

  // Switch between work and break intervals
  useEffect(() => {
    const isLastBreakFinished = !isWork && currentInterval === intervalCount;
    const isCurrentIntervalFinished = isWork
      ? remainingWorkSeconds === 0
      : remainingBreakSeconds === 0;

    if (!isPlaying) {
      timeUpMusicTrackRef.current?.pause();
      return;
    }

    if (!isCurrentIntervalFinished || isLastBreakFinished) return;

    // Play time-up sound at the end of each interval
    if (timeUpMusicTrackRef.current) {
      timeUpMusicTrackRef.current.play().catch((err) => {
        console.error("Failed to play time-up sound:", err);
      });

      // Prevent time-up sound from replaying when the timer is paused and resumed
      timeUPlaybackCountRef.current = 1;
    }

    // Delay interval switch for smoother transition
    const timeout = setTimeout(() => {
      timeUPlaybackCountRef.current = 0;

      setTimerState((prev) => {
        const nextIsWork = !prev.isWork;
        const nextInterval = prev.isWork
          ? prev.currentInterval
          : prev.currentInterval + 1;

        return {
          ...prev,
          isWork: nextIsWork,
          currentInterval: nextInterval,
          remainingWorkSeconds: nextIsWork
            ? prev.totalWorkSeconds
            : prev.remainingWorkSeconds,
          remainingBreakSeconds: nextIsWork
            ? prev.remainingBreakSeconds
            : prev.totalBreakSeconds,
        };
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [
    isPlaying,
    isWork,
    remainingWorkSeconds,
    remainingBreakSeconds,
    intervalCount,
    currentInterval,
  ]);

  // Reset the timer after the final break session
  useEffect(() => {
    const shouldPlayFinishSound =
      !isWork &&
      currentInterval === intervalCount &&
      remainingBreakSeconds === 0;

    if (!shouldPlayFinishSound) return;

    // Show completion notification
    toast.success("You've completed this pomodoro!");

    // Play end-of-session sound
    if (endmusicTrackRef.current) {
      endmusicTrackRef.current.play().catch((err) => {
        console.error("Failed to play end sound:", err);
      });
    }

    const timeout = setTimeout(() => {
      setTimerState({
        ...INITIAL_TIMER_STATE,
        intervalCount,
        totalWorkSeconds,
        totalBreakSeconds,
        remainingWorkSeconds: totalWorkSeconds,
        remainingBreakSeconds: totalBreakSeconds,
        musicTrack,
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
      endmusicTrackRef.current?.pause();
    };
  }, [isWork, intervalCount, currentInterval, remainingBreakSeconds]);

  const displayedSeconds = isWork
    ? remainingWorkSeconds
    : remainingBreakSeconds;

  const minutes = Math.floor(displayedSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (displayedSeconds % 60).toString().padStart(2, "0");

  return {
    timerState,
    setTimerState,
    countdown,
    minutes,
    seconds,
  };
};
