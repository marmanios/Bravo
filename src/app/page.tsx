"use client";

import AppHeader from "@/components/app-header";
import Map from "@/components/map";
import Window from "@/components/window";
import useCallLogs from "@/hooks/getAllCallLogs";

export default function HomePage() {
  const { data: callLogs, isLoading } = useCallLogs();

  return (
    <div className="h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 grid grid-cols-6 grid-rows-6 gap-4 p-4">
        <Window
          className="col-span-1 row-span-4"
          title="Call Log"
          shield
          circle="green"
        ></Window>
        <Window
          className="col-span-2 row-span-4 overflow-hidden relative"
          title="Map"
          shield
          circle="green"
        >
          <div className="grid place-content-center h-full w-full absolute top-0 left-0 z-0">
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
