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
};

const CallLogContext = createContext<TCallLogContext | undefined>(undefined);

export default CallLogContext;
