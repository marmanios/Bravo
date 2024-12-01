"use client";

import { TCallLog, TMetadata } from "@/utils/types";
import { createContext, Dispatch, SetStateAction } from "react";

type TCallLogContext = {
  selectedCallLog: TCallLog | null;
  setSelectedCallLog: Dispatch<SetStateAction<TCallLog | null>>;
  expandTranscript: boolean;
  setExpandTranscript: Dispatch<SetStateAction<boolean>>;
  metaData: TMetadata | null;
  setMetaData: Dispatch<SetStateAction<TMetadata | null>>;
  inCall: boolean;
  setInCall: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  createMode: boolean;
  setCreateMode: Dispatch<SetStateAction<boolean>>;
  aiThinking: boolean;
  setAiThinking: Dispatch<SetStateAction<boolean>>;
};

const CallLogContext = createContext<TCallLogContext | undefined>(undefined);

export default CallLogContext;
