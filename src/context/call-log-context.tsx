"use client";

import { TCallLog } from "@/utils/types";
import { createContext, Dispatch, SetStateAction } from "react";

type TCallLogContext = {
  selectedCallLog: TCallLog | null;
  setSelectedCallLog: Dispatch<SetStateAction<TCallLog | null>>;
};

const CallLogContext = createContext<TCallLogContext | undefined>(undefined);

export default CallLogContext;
