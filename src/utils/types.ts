import { Database } from "../../database.types";

// API
export type TMetadataResponse = {
  message: string;
  data: TMetadata | null;
  error: string | null;
};

export type TWord = {
  end: number;
  start: number;
  word: string;
};

export type TTransriptResponse = {
  text: string;
  vtt: string;
  word_count: number;
  words: TWord[];
};

// DATABASE

export type TCallLogDB = Database["public"]["Tables"]["call_logs"]["Row"];
export type TCallLogInsertDB =
  Database["public"]["Tables"]["call_logs"]["Insert"];
export type TTranscriptDB = Database["public"]["Tables"]["transcript"]["Row"];

// CLIENT
export type TTranscriptMessage = {
  text: string;
  timestamp: number;
};

export type TTranscriptCue = {
  start: number;
  end: number;
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

export const callTypeMap: Record<TCallType, string> = {
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
export const emergencyPriorityMap: Record<TEmergencyPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
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
  | "searchRescue"
  | "noResponse";


export const responderTypeMap: Record<TResponderType, string> = {
  noResponse: "No Response",
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

export type TMetadata = {
  caller_name: string;
  callback_information: string;
  incident_location: string;
  priority: string;
  incident_nature: string;
  people_locations: string;
}

export type TMetadataRequestBody = {
  text: string;
};

export type TApiResponse<T> = {
  data: T | null;
  message?: string;
};
