import {
  TApiResponse,
  TCallLog,
  TCallLogDB,
  TCallType,
  TEmergencyPriority,
  TEmergencyStatus,
  TResponderStatus,
  TResponderType,
} from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const DBtoClientCallLog = (dbCallLog: TCallLogDB): TCallLog => {
  return {
    id: dbCallLog.id,
    priority: dbCallLog.priority as TEmergencyPriority,
    status: dbCallLog.status as TEmergencyStatus,
    type: dbCallLog.type as TCallType,
    description: dbCallLog.description,
    createdAt: dbCallLog.created_at,
    endedAt: dbCallLog.ended_at,
    name: dbCallLog.name,
    phoneNumber: dbCallLog.phone_number,
    address: dbCallLog.address,
    city: dbCallLog.city,
    latitude: dbCallLog.latitude,
    longitude: dbCallLog.longitude,
    locationDescription: dbCallLog.location_description,
    responseType: dbCallLog.response_type as TResponderType,
    responseStatus: dbCallLog.response_status as TResponderStatus,
    dispatchedAt: dbCallLog.dispatched_at,
  };
};

export const fetchCallLogs = async (): Promise<TCallLog[] | null> => {
  const res = await fetch(`/api/call-logs`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const json: TApiResponse<TCallLogDB[]> = await res.json();

  return json.data?.map((log) => DBtoClientCallLog(log)) ?? null;
};

export default function useCallLogs() {
  return useQuery({
    queryKey: ["call-logs"],
    queryFn: async () => fetchCallLogs(),
  });
}
