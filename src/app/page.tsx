"use client";

import AppHeader from "@/components/app-header";
import CallLog from "@/components/call-log";
import Map from "@/components/map";
import Window from "@/components/window";
import useCallLogs from "@/hooks/getAllCallLogs";

export default function HomePage() {
  const { data: callLogs, isLoading } = useCallLogs();

  return (
    <div className="h-screen max-h-screen flex flex-col overflow-hidden">
      <AppHeader />
      <main className="h-[94vh] grid grid-cols-6 grid-rows-6 gap-4 p-4">
        <CallLog />
        <Window
          className="col-span-2 row-span-4 overflow-hidden relative"
          title="Map"
          shield
          circle="green"
        >
          <div className="grid place-content-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0">
            <Map />
          </div>
        </Window>
        <Window
          className="col-span-3 row-span-3"
          title="Transcript"
          circle="red"
        ></Window>
        <Window
          className="col-span-3 row-span-3"
          title="Bravo"
          shield
          circle="green"
        ></Window>
        <Window
          className="col-span-3 row-span-2"
          title="Active"
          circle="red"
        ></Window>
      </main>
    </div>
  );
}
