import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TimerStateContext } from "../context/TimerStateContext";
import { INITIAL_TIMER_STATE } from "@/lib/constants";

const positiveIntegerString = z
  .string()
  .nonempty("Required")
  .regex(/^\d+$/, { message: "Must be a whole number" })
  .refine((val) => parseInt(val, 10) >= 1, {
    message: "Must be at least 1",
  });

const formSchema = z.object({
  intervalCount: positiveIntegerString,
  totalWorkMinutes: positiveIntegerString,
  totalBreakMinutes: positiveIntegerString,
  musicTrack: z.union([
    z
      .instanceof(File)
      .refine(
        (file) =>
          file.type === "audio/mpeg" ||
          file.name?.toLowerCase().endsWith(".mp3"),
        {
          message: "Only .mp3 files are allowed",
        },
      ),
    z.undefined(),
  ]),
});

export const useSettingsForm = () => {
  const { setTimerState } = useContext(TimerStateContext);
  const [showFileName, setShowFileName] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intervalCount: "6",
      totalWorkMinutes: "25",
      totalBreakMinutes: "5",
      musicTrack: undefined,
    },
    mode: "onChange",
  });

  function onSubmit(values, setOpen) {
    const { intervalCount, totalWorkMinutes, totalBreakMinutes, musicTrack } =
      values;

    setTimerState({
      ...INITIAL_TIMER_STATE,
      intervalCount: parseInt(intervalCount, 10),
      // totalWorkSeconds: parseInt(totalWorkMinutes, 10) * 60,
      totalWorkSeconds: 10,
      // totalBreakSeconds: parseInt(totalBreakMinutes, 10) * 60,
      totalBreakSeconds: 5,
      // remainingWorkSeconds: parseInt(totalWorkMinutes, 10) * 60,
      remainingWorkSeconds: 10,
      // remainingBreakSeconds: parseInt(totalBreakMinutes, 10) * 60,
      remainingBreakSeconds: 5,
      musicTrack: musicTrack,
    });

    setOpen((prev) => !prev);
    setTimeout(() => setShowFileName(true), 1000);
  }

  return {
    form,
    onSubmit,
    showFileName,
  };
};
