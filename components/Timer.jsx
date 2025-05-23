"use client";

import { useTimer } from "@/hooks/useTimer";
import { TimerStateContext } from "@/hooks/useTimerState";
import clsx from "clsx";
import { useContext } from "react";

export const Timer = () => {
  const { timerState } = useContext(TimerStateContext);

  const { isPlaying, isWork, intervalCount, currentInterval } = timerState;
  const { minutes, seconds } = useTimer();

  return (
    <div
      className={clsx("rounded-container", {
        "border-none !bg-[#FF2826] text-black": isPlaying && isWork,
        "border-none !bg-[#0DB556] text-black": isPlaying && !isWork,
        "bg-black": !isPlaying,
      })}
    >
      <div className="flex justify-between">
        <p className="uppercase">{isWork ? "work" : "break"} interval</p>
        <p>
          {currentInterval}/{intervalCount}
        </p>
      </div>

      <p
        className="text-center text-[160px]"
        style={{ fontFamily: "Shtozer", fontWeight: 600 }}
      >
        {minutes}:{seconds}
      </p>
    </div>
  );
};
