"use client";

import { INITIAL_TIMER_STATE } from "@/lib/constants";
import { createContext, useState } from "react";

export const TimerStateContext = createContext();

export const TimerStateContextProvider = ({ children }) => {
  const [timerState, setTimerState] = useState(INITIAL_TIMER_STATE);

  return (
    <TimerStateContext.Provider value={{ timerState, setTimerState }}>
      {children}
    </TimerStateContext.Provider>
  );
};
