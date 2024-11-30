/* eslint-disable @typescript-eslint/no-unused-vars */
import { TApiResponse, TMetadata, TTransriptResponse} from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export const fetchTranscript = async (audioArray: number[]): Promise<TTransriptResponse | null> => {
  const res = await fetch(`https://winter-flower-4b40.armaniosmaged15.workers.dev/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"audio": audioArray}),
  });

  const json: TApiResponse<TTransriptResponse> = await res.json();
  return json.data ?? null;
};

export default function useTranscript({callback} : {callback: (data: TTransriptResponse | null) => void}) {
  return useMutation({
    mutationFn: fetchTranscript,
    onSuccess: (data) => {callback(data)}
  })
}
