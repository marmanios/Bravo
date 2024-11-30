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

export const callTypeMap = {
  Fire: "Fire",
  Medical: "Medical",
  Police: "Police",
  Traffic: "Traffic",
  Rescue: "Rescue",
  Utility: "Utility",
  PublicDisturbance: "Public Disturbance",
  AnimalControl: "Animal Control",
  Other: "Other",
};

export type TEmergencyPriority = "low" | "medium" | "high";
export type TEmergencyStatus = "pending" | "active" | "resolved" | "cancelled";
export type TResponderStatus =
  | "available"
  | "dispatched"
  | "onScene"
  | "returning";

export const responderStatusMap = {
  available: "Available",
  dispatched: "Dispatched",
  onScene: "On Scene",
  returning: "Returning",
};

export type TResponderType =
  | "police"
  | "fire"
  | "medical"
  | "trafficControl"
  | "hazmat"
  | "searchRescue";

export const responderTypeMap = {
  police: "Police",
  fire: "Fire",
  medical: "Medical",
  trafficControl: "Traffic Control",
  hazmat: "Hazmat",
  searchRescue: "Search & Rescue",
};

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
  responseStatus: TResponderStatus | null;
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
