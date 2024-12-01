"use client";
import { useState } from "react";
import CallLogContext from "./call-log-context";
import { TCallLog } from "@/utils/types";

export default function CallLogProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedCallLog, setSelectedCallLog] = useState<TCallLog | null>(null);
  const [expandTranscript, setExpandTranscript] = useState(false);

  return (
    <>
      <CallLogContext.Provider
        value={{
          selectedCallLog,
          setSelectedCallLog,
          expandTranscript,
          setExpandTranscript,
        }}
      >
        {children}
      </CallLogContext.Provider>
    </>
  );
}
