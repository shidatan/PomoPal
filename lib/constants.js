export const INITIAL_TIMER_STATE = {
  isPlaying: false,
  isWork: true,
  intervalCount: 6,
  currentInterval: 1,
  workDuration: 25 * 60, // 25 minutes
  secondsLeft: 25 * 60, // 25 minutes
  musicTrack: undefined,
};

export const BREAK_DURATION = 5 * 60; // 5 minutes