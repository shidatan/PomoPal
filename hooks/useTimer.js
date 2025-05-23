import { BREAK_DURATION, INITIAL_TIMER_STATE } from "@/lib/constants";
import { useContext, useEffect } from "react";
import { TimerStateContext } from "./useTimerState";

export const useTimer = () => {
  const { timerState, setTimerState } = useContext(TimerStateContext);

  const {
    isPlaying,
    isWork,
    intervalCount,
    currentInterval,
    workDuration,
    secondsLeft,
  } = timerState;

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

    // Delay the interval switch to allow for a smoother transition
    const timeout = setTimeout(() => {
      setTimerState((prev) => {
        const nextIsWork = !prev.isWork;
        const nextInterval = prev.isWork
          ? prev.currentInterval
          : prev.currentInterval + 1;
        const nextSeconds = nextIsWork ? workDuration : BREAK_DURATION;

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

  // Reset the timer state after the last interval
  useEffect(() => {
    if (isWork || currentInterval < intervalCount || secondsLeft > 0) return;

    const timeout = setTimeout(() => {
      setTimerState({
        ...INITIAL_TIMER_STATE,
        intervalCount,
        workDuration,
        secondsLeft: workDuration,
      });
    }, 1000);

    return () => clearTimeout(timeout);
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
