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
        <Settings className="size-6 cursor-pointer text-white" />
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader className="space-y-6 p-0">
          <div>
            <SheetTitle className="font-medium text-white">
              Pomodoro Settings
            </SheetTitle>
            <SheetDescription>
              Customize your Pomodoro preferences
            </SheetDescription>
          </div>

          <SettingsForm setOpen={setOpen} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
