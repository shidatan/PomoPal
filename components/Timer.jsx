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
        "rounded-container 3xl:rounded-[5rem] flex aspect-[1.5] w-full flex-col justify-center gap-4 rounded-[4rem] xl:aspect-[1.6]",
        {
          "border-none !bg-[#FF2826] text-black": isPlaying && isWork,
          "border-none !bg-[#0DB556] text-black": isPlaying && !isWork,
          "bg-black": !isPlaying,
        },
      )}
    >
      <div className="mx-auto w-[85%]">
        <div className="font-400 flex justify-between font-light tracking-widest">
          <p className="uppercase">{isWork ? "work" : "break"} interval</p>
          <p>
            {currentInterval}/{intervalCount}
          </p>
        </div>

        <p
          className="font-800 text-center"
          style={{ fontFamily: "Shtozer", fontWeight: 600 }}
        >
          {showCountdown ? countdown : `${minutes}:${seconds}`}
        </p>
      </div>
    </div>
  );
};
