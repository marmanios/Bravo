import { TApiResponse, TCallLog, TCallLogDB } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const DBtoClientCallLog = (dbCallLog: TCallLogDB): TCallLog => {
  return {
    id: dbCallLog.id,
    name: dbCallLog.name ?? "",
    created_at: dbCallLog.created_at,
  };
};

export const fetchCallLogs = async (): Promise<TCallLog[] | null> => {
  const res = await fetch(`/api/call-logs`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const json: TApiResponse<TCallLog[]> = await res.json();

  return json.data?.map((log) => DBtoClientCallLog(log)) ?? null;
};

export default function useCallLogs() {
  return useQuery({
    queryKey: ["call-logs"],
    queryFn: async () => fetchCallLogs(),
  });
}
