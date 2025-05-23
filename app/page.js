import { MusicPlayer } from "@/components/MusicPlayer";
import { Timer } from "@/components/Timer";

export default function Home() {
  return (
    <div className="flex h-[396px] w-full justify-between gap-20">
      <Timer />
      <MusicPlayer />
    </div>
  );
}
