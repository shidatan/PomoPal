import background from "@/app/background.png";
import { SettingsSheet } from "@/components/SettingsSheet";
import { Toaster } from "@/components/ui/sonner";
import { MusicTrackRefContextProvider } from "@/context/MusicTrackRefContext";
import { SettingsFormContextProvider } from "@/context/SettingsFormContext";
import { TimerStateContextProvider } from "@/context/TimerStateContext";
import Image from "next/image";
import "./globals.css";
import { Hero } from "@/components/Hero";

export const metadata = {
  title: "PomoPal",
  description: "Your Pomodoro, Your Tune.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-primary-foreground flex h-screen items-center antialiased">
        <Image
          src={background}
          fill={true}
          alt="Background Image"
          quality={100}
          className="fixed inset-0 -z-10"
        />

        <TimerStateContextProvider>
          <MusicTrackRefContextProvider>
            <SettingsFormContextProvider>
              <div className="4xl:gap-8 mx-auto flex w-[90%] max-w-[160rem] flex-col gap-4">
                <div className="flex items-center">
                  <SettingsSheet />
                </div>

                <div className="flex items-end gap-6">
                  <div className="w-1/2">
                    <Hero />
                  </div>

                  <div className="w-1/2">{children}</div>
                </div>
              </div>
            </SettingsFormContextProvider>
          </MusicTrackRefContextProvider>
        </TimerStateContextProvider>

        <Toaster />
      </body>
    </html>
  );
}
