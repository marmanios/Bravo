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
  | "Available"
  | "Dispatched"
  | "OnScene"
  | "Returning";

export const responderStatusMap = {
  Available: "Available",
  Dispatched: "Dispatched",
  OnScene: "On Scene",
  Returning: "Returning",
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
  priority: TEmergencyPriority | null; // meta data
  status: TEmergencyStatus | null; // action
  type: TCallType | null; // meta data
  description: string | null; // input
  createdAt: string; // auto
  endedAt: string | null; // auto
  name: string | null; // input
  phoneNumber: string | null; // input (fake numbers)
  address: string | null; // input
  city: string | null; // input
  latitude: string | null; // metadata
  longitude: string | null; // metadata
  locationDescription: string | null; // input
  responseType: TResponderType | null; // action
  responseStatus: TResponderStatus | null; // action
  dispatchedAt: string | null; // auto

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
