"use client";

import { useContext } from "react";
import CallLogContext from "./call-log-context";

export default function useCallLog() {
  const consumer = useContext(CallLogContext);

  if (!consumer) {
    throw new Error("useCallLog must be used within a CallLogProvider");
  }

  return consumer;
}
