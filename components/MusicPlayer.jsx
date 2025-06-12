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
      <div className="rounded-container flex-1 space-y-2 rounded-full px-10 py-4 xl:py-5 2xl:space-y-3 2xl:px-12 2xl:py-6">
        <p
          className={`baseFontScale text-left ${!musicTrackNameWithoutExtension ? "text-muted-foreground" : ""}`}
        >
          {musicTrackNameWithoutExtension || "No music track selected."}
        </p>

        <div className="bg-secondary relative h-3 rounded-full overflow-hidden">
          <div
            className={clsx(
              "absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-in-out",
              {
                "bg-[linear-gradient(90deg,_#1E1E1E_0%,_#0DB556_100%)]":
                  !isWork,
                "bg-[linear-gradient(90deg,_#1E1E1E_0%,_#FF2826_100%)]": isWork,
              },
            )}
            style={{
              width: `${progressBarWidth}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="rounded-container flex w-1/4 max-w-[182px] items-center justify-center gap-4 rounded-full">
        <Button
          variant="secondary"
          className="h-auto w-auto cursor-pointer rounded-full !p-2"
          onClick={() =>
            setTimerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
          }
        >
          {isPlaying ? (
            <Pause className="size-5 fill-white xl:size-7 2xl:size-8" />
          ) : (
            <Play className="size-5 fill-white xl:size-7 2xl:size-8" />
          )}
        </Button>

        <Button
          variant="secondary"
          className="h-9 w-9 cursor-pointer rounded-full xl:h-11 xl:w-11 2xl:h-12 2xl:w-12"
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
          <RotateCcw className="size-3 text-white xl:size-5 2xl:size-6" />
        </Button>
      </div>
    </div>
  );
};
