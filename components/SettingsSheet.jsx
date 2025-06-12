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
        <Settings className="size-6 cursor-pointer text-white 3xl:size-7" />
      </SheetTrigger>
      <SheetContent className="p-6 2xl:!max-w-md">
        <SheetHeader className="max-w-none space-y-6 p-0">
          <div>
            <SheetTitle className="secondaryFontScale font-normal text-white">
              Pomodoro Settings
            </SheetTitle>
            <SheetDescription className="baseFontScale">
              Customize your Pomodoro preferences
            </SheetDescription>
          </div>

          <SettingsForm setOpen={setOpen} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
