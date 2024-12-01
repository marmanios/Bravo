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

  return (
    <>
      <CallLogContext.Provider value={{ selectedCallLog, setSelectedCallLog }}>
        {children}
      </CallLogContext.Provider>
    </>
  );
}
