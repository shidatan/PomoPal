"use client";

import { createContext, useRef } from "react";

export const MusicTrackRefContext = createContext(null);

export const MusicTrackRefContextProvider = ({ children }) => {
  const musicTrackRef = useRef(null);

  return (
    <MusicTrackRefContext.Provider value={{ musicTrackRef }}>
      {children}
    </MusicTrackRefContext.Provider>
  );
};
