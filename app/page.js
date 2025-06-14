import { MusicPlayer } from "@/components/MusicPlayer";
import { Timer } from "@/components/Timer";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <Timer />
      <MusicPlayer />
    </div>
  );
}
