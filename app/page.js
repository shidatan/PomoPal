"use client";

import { MusicPlayer } from "@/components/MusicPlayer";
import { Timer } from "@/components/Timer";
import { INITIAL_TIMER_STATE } from "@/lib/constants";
import { useState } from "react";

export default function Home() {
  const [timerState, setTimerState] = useState(INITIAL_TIMER_STATE);

  return (
    <div className="flex h-[396px] w-full justify-between gap-20">
      <Timer timerState={timerState} setTimerState={setTimerState} />
      <MusicPlayer timerState={timerState} setTimerState={setTimerState} />
    </div>
  );
}
