import "./globals.css";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const metadata = {
  title: "Pomodoro Timer",
  description: "Your Pomodoro, Your Tune.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-primary-foreground antialiased">
        <div className="mx-auto flex h-screen w-[90%] max-w-7xl flex-col justify-between pt-16 pb-8">
          <div className="flex items-center justify-between">
            <p>PomoPal</p>
            <Button
              variant="secondary"
              className="cursor-pointer rounded-full bg-white !p-2 hover:bg-white/80"
            >
              <Settings className="size-5 text-black" />
            </Button>
          </div>

          {children}

          <p
            className="mx-auto text-xs"
            style={{ fontFamily: "Helvetica Now Display", fontWeight: 300 }}
          >
            Your Pomodoro, Your Tune.
          </p>
        </div>
      </body>
    </html>
  );
}
