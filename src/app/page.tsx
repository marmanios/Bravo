"use client";

import useCallLogs from "@/hooks/getAllCallLogs";

export default function HomePage() {
  const { data: callLogs, isLoading } = useCallLogs();

  return <div>{callLogs && callLogs[0].name}</div>;
}
