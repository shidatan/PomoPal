import "./globals.css";

export const metadata = {
  title: "Pomodoro Timer",
  description: "Your Pomodoro, Your Tune.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
