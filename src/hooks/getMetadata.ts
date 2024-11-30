import { TApiResponse, TMetadata, TMetadataRequestBody} from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export const fetchMetadata = async (reqbody: TMetadataRequestBody): Promise<TMetadata | null> => {
  const res = await fetch(`https://sweet-dawn-b9c1.armaniosmaged15.workers.dev/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqbody),
  });
  const json: TApiResponse<TMetadata> = await res.json();

  return json.data ?? null;
};

export default function useMetadata({callback} : {callback: (data: TMetadata | null) => void}) {
  return useMutation({
    mutationFn: fetchMetadata,
    onSuccess: (data) => {callback(data)}
  })
}
