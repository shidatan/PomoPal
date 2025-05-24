import { MusicTrackRefContext } from "@/context/MusicTrackRefContext";
import { SettingsFormContext } from "@/context/SettingsFormContext";
import { TimerStateContext } from "@/context/TimerStateContext";
import { INITIAL_TIMER_STATE } from "@/lib/constants";
import { useContext } from "react";

export const useResetSettingsForm = (musicTrackInputRef) => {
  const { setTimerState } = useContext(TimerStateContext);
  const { form } = useContext(SettingsFormContext);
  const { musicTrackRef } = useContext(MusicTrackRefContext);

  function resetForm(setOpen) {
    form.reset();

    setTimerState(INITIAL_TIMER_STATE);

    // Reset the file input value
    if (musicTrackInputRef.current) {
      musicTrackInputRef.current.value = "";
    }

    // Reset the audio element
    if (musicTrackRef.current) {
      musicTrackRef.current.pause();
      musicTrackRef.current.currentTime = 0;
      URL.revokeObjectURL(musicTrackRef.current.src);
      musicTrackRef.current = null;
    }

    setOpen((prev) => !prev);
  }

  return { resetForm };
};
