import { Database } from "../../database.types";

// DATABASE

export type TCallLogDB = Database["public"]["Tables"]["call_logs"]["Row"];

// CLIENT

export type TCallType =
  | "Fire" // 🔥 Fire-related incidents
  | "Medical" // 🚑 Medical emergencies
  | "Police" // 🚓 Police reports
  | "Traffic" // 🛑 Traffic accidents or obstructions
  | "Rescue" // ⛑️ Search and rescue operations
  | "Utility" // ⚡ Utility-related emergencies (e.g., power outages)
  | "PublicDisturbance" // 🎉 Public disturbance or noise complaints
  | "AnimalControl" // 🐾 Animal-related issues
  | "Other"; // Catch-all for unclassified emergencies

export type TCallLog = {
  id: number;
  name: string;
  created_at: string;
};

export type TApiResponse<T> = {
  data: T | null;
  message?: string;
};
