"use client";

import { useTimer } from "@/hooks/useTimer";
import { TimerStateContext } from "@/context/TimerStateContext";
import clsx from "clsx";
import { useContext } from "react";

export const Timer = () => {
  const { timerState } = useContext(TimerStateContext);

  const { countdown, minutes, seconds } = useTimer();

  const { isPlaying, isWork, intervalCount, currentInterval } = timerState;

  const showCountdown = isPlaying && countdown >= 1;

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
        {showCountdown ? countdown : `${minutes}:${seconds}`}
      </p>
    </div>
  );
};
