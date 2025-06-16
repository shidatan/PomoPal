"use client";

import { SettingsForm } from "@/components/SettingsForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TimerStateContext } from "@/context/TimerStateContext";
import { Settings } from "lucide-react";
import { useContext, useState } from "react";

export const SettingsSheet = () => {
  const { setTimerState } = useContext(TimerStateContext);
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        onClick={() => setTimerState((prev) => ({ ...prev, isPlaying: false }))}
      >
        <Settings className="4xl:size-10 3xl:size-7 size-5 cursor-pointer text-white xl:size-6" />
      </SheetTrigger>
      <SheetContent className="3xl:!max-w-md 4xl:!max-w-lg 4xl:p-10 !w-[30%] bg-black p-7">
        <SheetHeader className="3xl:space-y-8 4xl:space-y-10 max-w-none space-y-4 p-0 xl:space-y-6">
          <div>
            <SheetTitle className="font-400 font-normal text-white">
              Pomodoro Settings
            </SheetTitle>
            <SheetDescription className="font-300">
              Customize your Pomodoro preferences
            </SheetDescription>
          </div>

          <SettingsForm setOpen={setOpen} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
