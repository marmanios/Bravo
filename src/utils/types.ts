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

export type TCallLog = {
  id: number;
  name: string;
  created_at: string;
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
