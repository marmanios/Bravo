import { Database } from "../../database.types";

// DATABASE

export type TCallLogDB = Database["public"]["Tables"]["call_logs"]["Row"];

// CLIENT

export type TTranscriptInstance = TTranscriptEvent | TTranscriptMessage;

export type TTranscriptEvent = TTranscriptBase & {
  type: "event";
  speaker: null;
};

export type TTranscriptMessage = TTranscriptBase & {
  type: "message";
  speaker: "caller" | "dispatcher";
};

export type TTranscriptBase = {
  messageId: number;
  time: Date;
  text: string;
};

export type TCallType =
  | "Fire"
  | "Medical"
  | "Police"
  | "Traffic"
  | "Rescue"
  | "Utility"
  | "PublicDisturbance"
  | "AnimalControl"
  | "Other";
export type TEmergencyPriority = "low" | "medium" | "high";
export type TEmergencyStatus = "pending" | "active" | "resolved" | "cancelled";
export type TResponderStatus =
  | "available"
  | "dispatched"
  | "on_scene"
  | "returning";
export type TResponderType =
  | "police"
  | "fire"
  | "medical"
  | "traffic_control"
  | "hazmat"
  | "search_rescue";

export type TCallLog = {
  id: number;
  priority: TEmergencyPriority | null;
  status: TEmergencyStatus | null;
  type: TCallType | null;
  description: string | null;
  createdAt: string;
  endedAt: string | null;
  name: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  latitude: string | null;
  longitude: string | null;
  locationDescription: string | null;
  responseType: TResponderType | null;
  dispatchedAt: string | null;

  // transcript: {
  //   turnId: string;
  //   timestamp: string;
  //   speakerType: "dispatcher" | "caller" | "system";
  //   content: string;
  // }[];
};

export type TApiResponse<T> = {
  data: T | null;
  message?: string;
};
