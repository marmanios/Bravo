"use client";

import { TCallLog } from "@/utils/types";
import { createContext, Dispatch, SetStateAction } from "react";

type TCallLogContext = {
  selectedCallLog: TCallLog | null;
  setSelectedCallLog: Dispatch<SetStateAction<TCallLog | null>>;
  expandTranscript: boolean;
  setExpandTranscript: Dispatch<SetStateAction<boolean>>;
};

const CallLogContext = createContext<TCallLogContext | undefined>(undefined);

export default CallLogContext;
