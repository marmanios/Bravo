"use client";

import CallCard from "../call-card";
import Window from "../window";
import useCallLogs from "@/hooks/getAllCallLogs";

export default function CallLog() {
  const { data: callLogs, isLoading } = useCallLogs();

  return (
    <Window
      className="col-span-1 row-span-4"
      title="Call Log"
      shield
      circle="green"
    >
      {callLogs &&
        callLogs.map((log) => {
          return (
            <CallCard
              id={log.id}
              time={log.createdAt}
              status={log.status ?? "pending"}
              type={log.type ?? "Other"}
              title={log.description ?? "Unknown"}
            />
          );
        })}
    </Window>
  );
}
