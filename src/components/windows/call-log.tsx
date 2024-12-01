"use client";

import useCallLog from "@/context/use-call-log";
import CallCard from "../call-card";
import Window from "../window";
import useCallLogs from "@/hooks/getAllCallLogs";

type props = {
  loading: "initialize" | "fetching" | "completed";
};

export default function CallLog({ loading }: props) {
  const { data: callLogs } = useCallLogs();

  return (
    <Window
      className="col-span-1 row-span-4"
      title={`Call Log`}
      shield
      loadingOffset={600}
      loading={loading}
    >
      {callLogs &&
        callLogs
          .filter((log) => log.type)
          .map((log) => {
            return <CallCard key={log.id} log={log} />;
          })}
    </Window>
  );
}
