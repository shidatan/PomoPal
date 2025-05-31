export const INITIAL_TIMER_STATE = {
  isPlaying: false,
  countdown: 4,
  isWork: true,
  intervalCount: 6,
  currentInterval: 1,
  totalWorkSeconds: 25 * 60, // 25 minutes
  totalBreakSeconds: 5 * 60, // 5 minutes
  // remainingWorkSeconds: 25 * 60, // 25 minutes
  remainingWorkSeconds: 10,
  // remainingBreakSeconds: 5 * 60, // 5 minutes
  remainingBreakSeconds: 5,
  musicTrack: undefined,
};
