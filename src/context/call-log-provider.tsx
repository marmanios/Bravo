"use client";
import { useState } from "react";
import CallLogContext from "./call-log-context";
import { TCallLog, TMetadata } from "@/utils/types";

export default function CallLogProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedCallLog, setSelectedCallLog] = useState<TCallLog | null>(null);
  const [expandTranscript, setExpandTranscript] = useState(false);
  const [metaData, setMetaData] = useState<TMetadata | null>(null);

  return (
    <>
      <CallLogContext.Provider
        value={{
          selectedCallLog,
          setSelectedCallLog,
          expandTranscript,
          setExpandTranscript,
          metaData,
          setMetaData,
        }}
      >
        {children}
      </CallLogContext.Provider>
    </>
  );
}
