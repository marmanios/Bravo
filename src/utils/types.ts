import { Database } from "../../database.types";

// DATABASE

export type TCallLogDB = Database["public"]["Tables"]["call_logs"]["Row"];

// CLIENT

export type TCallLog = {
  id: number;
  name: string;
  created_at: string;
};

export type TApiResponse<T> = {
  data: T | null;
  message?: string;
};
