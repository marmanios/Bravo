import AppHeader from "@/components/windows/app-header";
import CallLog from "@/components/windows/call-log";
import Map from "@/components/windows/map";
import Status from "@/components/windows/status";
import Transcript from "@/components/windows/transcript";
import Window from "@/components/window";

export default function HomePage() {
  return (
    <div className="h-screen max-h-screen flex flex-col overflow-hidden">
      <AppHeader />
      <main className="h-[94vh] grid grid-cols-6 grid-rows-6 gap-4 p-4">
        <CallLog />
        <Map />
        <Transcript />
        <Window
          className="col-span-2 row-span-3"
          title="Bravo"
          shield
          circle="green"
        ></Window>
        <Status />
      </main>
    </div>
  );
}
