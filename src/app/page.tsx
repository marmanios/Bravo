"use client";

import AppHeader from "@/components/windows/app-header";
import CallLog from "@/components/windows/call-log";
import Map from "@/components/windows/map";
import Status from "@/components/windows/status";
import Transcript from "@/components/windows/transcript";
import Bravo from "@/components/windows/bravo";
import { useEffect, useState } from "react";
import { cn } from "@/utils";

export default function HomePage() {
  const [loading, setLoading] = useState<
    "initialize" | "fetching" | "completed"
  >("initialize");

  useEffect(() => {
    const fetchingTimeout = setTimeout(() => {
      setLoading("fetching");
      const completedTimeout = setTimeout(() => {
        setLoading("completed");
        clearTimeout(completedTimeout);
      }, 2000);
    }, 1500);

    return () => {
      clearTimeout(fetchingTimeout);
    };
  }, []);

  return (
    <div className="h-screen max-h-screen flex flex-col overflow-hidden">
      <AppHeader />
      <main
        className={cn(
          "h-[94vh] grid grid-cols-6 grid-rows-6 gap-4 p-4 transition-all duration-700",
          loading === "initialize" && "h-[20vh]"
        )}
      >
        <CallLog loading={loading} />
        <Map loading={loading} />
        <Transcript loading={loading} />
        <Bravo loading={loading} />
        <Status loading={loading} />
      </main>
    </div>
  );
}
