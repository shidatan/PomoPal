"use client";

import { Button } from "@/components/ui/button";
import { MusicTrackRefContext } from "@/context/MusicTrackRefContext";
import { TimerStateContext } from "@/context/TimerStateContext";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { INITIAL_TIMER_STATE } from "@/lib/constants";
import clsx from "clsx";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useContext } from "react";

export const MusicPlayer = () => {
  const { musicTrackRef } = useContext(MusicTrackRefContext);
  const { timerState, setTimerState } = useContext(TimerStateContext);
  const { progressBarWidth, musicTrackNameWithoutExtension } = useMusicPlayer();

  const {
    isPlaying,
    isWork,
    intervalCount,
    totalWorkSeconds,
    totalBreakSeconds,
    musicTrack,
  } = timerState;

  return (
    <div className="flex w-full gap-4">
      <div className="rounded-container 3xl:py-7 4xl:py-8 flex-1 rounded-full py-3 xl:py-4 2xl:py-6">
        <div className="mx-auto w-[80%] space-y-2 2xl:space-y-3">
          <p
            className={`font-400 text-left ${!musicTrackNameWithoutExtension ? "text-muted-foreground" : ""}`}
          >
            {musicTrackNameWithoutExtension || "No music track selected."}
          </p>

          <div className="bg-secondary 3xl:h-3.5 4xl:h-5 relative h-2 overflow-hidden rounded-full 2xl:h-3">
            <div
              className={clsx(
                "absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-in-out",
                {
                  "bg-[linear-gradient(90deg,_#1E1E1E_0%,_#0DB556_100%)]":
                    !isWork,
                  "bg-[linear-gradient(90deg,_#1E1E1E_0%,_#FF2826_100%)]":
                    isWork,
                },
              )}
              style={{
                width: `${progressBarWidth}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="4xl:max-w-[14rem] 4xl:gap-6 rounded-container 3xl:max-w-[12rem] 3xl:gap-5 flex w-1/4 max-w-[6.5rem] items-center justify-center gap-3 rounded-full xl:max-w-[8rem] 2xl:max-w-[10.5rem] 2xl:gap-4">
        <Button
          variant="secondary"
          className="h-auto w-auto cursor-pointer rounded-full !p-2"
          onClick={() =>
            setTimerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
          }
        >
          {isPlaying ? (
            <Pause className="3xl:size-10 4xl:size-12 size-4 fill-white xl:size-6 2xl:size-8" />
          ) : (
            <Play className="3xl:size-10 4xl:size-12 size-4 fill-white xl:size-6 2xl:size-8" />
          )}
        </Button>

        <Button
          variant="secondary"
          className="4xl:size-16 3xl:size-14 size-8 cursor-pointer rounded-full xl:size-10 2xl:size-12"
          onClick={() => {
            setTimerState({
              ...INITIAL_TIMER_STATE,
              intervalCount,
              totalWorkSeconds,
              totalBreakSeconds,
              remainingWorkSeconds: totalWorkSeconds,
              remainingBreakSeconds: totalBreakSeconds,
              musicTrack,
            });

            if (musicTrackRef.current) {
              musicTrackRef.current.pause();
              musicTrackRef.current.currentTime = 0;
            }
          }}
        >
          <RotateCcw className="4xl:size-10 3xl:size-8 size-3 stroke-1 text-white xl:size-4 2xl:size-6" />
        </Button>
      </div>
    </div>
  );
};
