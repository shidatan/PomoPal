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
    <div className="rounded-container">
      <p
        className={`mb-8 ${!musicTrackNameWithoutExtension ? "text-muted-foreground italic" : ""}`}
      >
        {musicTrackNameWithoutExtension || "No music track selected."}
      </p>

      <div className="bg-secondary relative mb-12 h-4 rounded-full">
        <div
          className={clsx(
            "absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-in-out",
            {
              "bg-[linear-gradient(90deg,_#1E1E1E_0%,_#0DB556_100%)]": !isWork,
              "bg-[linear-gradient(90deg,_#1E1E1E_0%,_#FF2826_100%)]": isWork,
            },
          )}
          style={{
            width: `${progressBarWidth}%`,
          }}
        ></div>
      </div>

      <div className="flex items-center justify-center gap-9">
        <Button
          variant="secondary"
          className="h-auto w-auto cursor-pointer rounded-full !p-2"
          onClick={() =>
            setTimerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
          }
        >
          {isPlaying ? (
            <Pause className="size-10 fill-white stroke-1" />
          ) : (
            <Play className="size-10 fill-white" />
          )}
        </Button>

        <Button
          variant="secondary"
          className="h-14 w-14 cursor-pointer rounded-full"
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
          <RotateCcw className="size-8 stroke-1 text-white" />
        </Button>
      </div>
    </div>
  );
};
