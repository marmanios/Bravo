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
  const [inCall, setInCall] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

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
          inCall,
          setInCall,
          editMode,
          setEditMode,
          createMode,
          setCreateMode,
          aiThinking,
          setAiThinking,
        }}
      >
        {children}
      </CallLogContext.Provider>
    </>
  );
}
