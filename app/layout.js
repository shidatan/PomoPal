import { SettingsSheet } from "@/components/SettingsSheet";
import { Toaster } from "@/components/ui/sonner";
import { SettingsFormContextProvider } from "@/context/SettingsFormContext";
import { TimerStateContextProvider } from "@/context/TimerStateContext";
import "./globals.css";
import { MusicTrackRefContextProvider } from "@/context/MusicTrackRefContext";

export const metadata = {
  title: "PomoPal",
  description: "Your Pomodoro, Your Tune.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-primary-foreground antialiased">
        <TimerStateContextProvider>
          <MusicTrackRefContextProvider>
            <SettingsFormContextProvider>
              <div className="mx-auto flex h-screen w-[90%] max-w-7xl flex-col justify-between pt-16 pb-8">
                <div className="flex items-center justify-between">
                  <p>PomoPal</p>
                  <SettingsSheet />
                </div>

                {children}

                <p
                  className="mx-auto text-xs"
                  style={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 300,
                  }}
                >
                  Your Pomodoro, Your Tune.
                </p>
              </div>
            </SettingsFormContextProvider>
          </MusicTrackRefContextProvider>
        </TimerStateContextProvider>

        <Toaster />
      </body>
    </html>
  );
}
