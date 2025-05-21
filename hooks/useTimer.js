import { INITIAL_TIMER_STATE } from "@/lib/constants";
import { useEffect } from "react";

export const useTimer = (timerState, setTimerState) => {
  const { isPlaying, isWork, currentInterval, secondsLeft } = timerState;

  // Update the timer state every second
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimerState((prev) => ({
        ...prev,
        secondsLeft: Math.max(prev.secondsLeft - 1, 0),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Check if the timer has reached zero and switch intervals
  useEffect(() => {
    if (!isPlaying || secondsLeft !== 0) return;

    const timeout = setTimeout(() => {
      setTimerState((prev) => {
        const nextIsWork = !prev.isWork;
        const nextInterval = prev.isWork
          ? prev.currentInterval
          : prev.currentInterval + 1;
        const nextSeconds = nextIsWork ? 5 : 5;

        return {
          ...prev,
          isWork: nextIsWork,
          currentInterval: nextInterval,
          secondsLeft: nextSeconds,
        };
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isPlaying, secondsLeft]);

  // Reset the timer state after 6 intervals
  useEffect(() => {
    if (isWork || currentInterval < 6 || secondsLeft > 0) return;

    const timeout = setTimeout(() => {
      setTimerState(INITIAL_TIMER_STATE);
    }, 1000);
  }, [isWork, currentInterval, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return {
    timerState,
    setTimerState,
    minutes,
    seconds,
  };
};
