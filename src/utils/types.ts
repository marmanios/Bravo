import { Database } from "../../database.types";

// API
export type TMetadataResponse = {
  message: string,
  data: TMetadata | null,
  error: string | null
}

export type TWord = {
  end: number,
  start: number,
  word: string,
}

export type TTransriptResponse = {
  text: string,
  vtt: string,
  word_count: number,
  words: TWord[],
}

// DATABASE

export type TCallLogDB = Database["public"]["Tables"]["call_logs"]["Row"];

// CLIENT
export type TTranscriptCue = {
  start: number,
  end: number,
  text: string,
}

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

export type TMetadata = {
  caller_name: string,
  callback_information: string,
  incident_location: string,
  incident_nature: string,
  people_locations: string,
}

export type TMetadataRequestBody = {
  text: string,
}

export type TApiResponse<T> = {
  data: T | null;
  message?: string;
};
