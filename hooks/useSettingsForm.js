import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TimerStateContext } from "./useTimerState";

const formSchema = z.object({
  intervalCount: z
    .string()
    .nonempty("Required")
    .regex(/^\d+$/, { message: "Must be a whole number" })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: "Must be at least 1",
    }),
  workDuration: z
    .string()
    .nonempty("Required")
    .regex(/^\d+$/, { message: "Must be a whole number" })
    .refine((val) => parseInt(val, 10) >= 1, {
      message: "Must be at least 1",
    }),
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
  const [ showFileName, setShowFileName ] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intervalCount: "6",
      workDuration: "25",
      musicTrack: undefined,
    },
    mode: "onChange",
  });

  function onSubmit(values, setOpen) {
    console.log(values);
    const { intervalCount, workDuration, musicTrack } = values;

    setTimerState((prev) => ({
      ...prev,
      intervalCount: parseInt(intervalCount, 10),
      workDuration: parseInt(workDuration, 10) * 60,
      secondsLeft: parseInt(workDuration, 10) * 60,
      musicTrack: musicTrack,
    }));

    setOpen((prev) => !prev);
    setTimeout(() => setShowFileName(true), 1000);
  }

  return {
    form,
    onSubmit,
    showFileName
  };
};
