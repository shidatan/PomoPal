"use client";

import { useTimer } from "@/hooks/useTimer";
import clsx from "clsx";

export const Timer = () => {
  const {
    isPlaying,
    isWork,
    intervalCount,
    currentInterval,
    countdown,
    minutes,
    seconds,
    showCountdown,
  } = useTimer();

  return (
    <div
      className={clsx(
        "rounded-container flex aspect-video w-full flex-col justify-center rounded-[64px] p-10 3xl:p-12",
        {
          "border-none !bg-[#FF2826] text-black": isPlaying && isWork,
          "border-none !bg-[#0DB556] text-black": isPlaying && !isWork,
          "bg-black": !isPlaying,
        },
      )}
    >
      <div className="baseFontScale flex justify-between font-light tracking-widest">
        <p className="uppercase">{isWork ? "work" : "break"} interval</p>
        <p>
          {currentInterval}/{intervalCount}
        </p>
      </div>

      <p
        className="text-center timerFontScale"
        style={{ fontFamily: "Shtozer", fontWeight: 600 }}
      >
        {showCountdown ? countdown : `${minutes}:${seconds}`}
      </p>
    </div>
  );
};
