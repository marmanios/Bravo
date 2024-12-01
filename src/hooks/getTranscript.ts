/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { TApiResponse, TMetadata, TTranscriptDB, TTranscriptMessage, TTransriptResponse} from "@/utils/types";
import { useQuery } from "@tanstack/react-query";


// GIVEN AUDIO BLOB
// export const fetchTranscript = async (audioArray: number[]): Promise<TTransriptResponse | null> => {
//   const res = await fetch(`https://winter-flower-4b40.armaniosmaged15.workers.dev/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({"audio": audioArray}),
//   });

//   const json: TApiResponse<TTransriptResponse> = await res.json();
//   return json.data ?? null;
// };

// Fetches transcript of the audio from the given url
// uses cloudfare + whispher ai

// export const fetchTranscript = async (url: string): Promise<TTranscriptCue[] | null> => {
//   const res = await fetch(`https://lucky-darkness-d9ab.armaniosmaged15.workers.dev/?url=${encodeURIComponent(url)}`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

//   const json: TApiResponse<TTransriptResponse> = await res.json();
//   return json.data?.vtt !== undefined ? parseVTT(json.data?.vtt) : null;
// };

// FOR THE DEMO. Fetch line
export const fetchTranscript = async (logID: number | undefined): Promise<TTranscriptMessage[] | null> => {
  if (logID === undefined) return null;
  const res = await fetch(`/api/transcript/${logID}`, {
    method: "GET",
  });

  const json: TApiResponse<TTranscriptDB> = await res.json();
  return json.data?.transcript as TTranscriptMessage[] ?? null;
};

export default function useTranscript(logID: number | undefined) {
  return useQuery({
    queryKey: ["transcript", logID],
    queryFn: async () => fetchTranscript(logID),
  })
}

// const parseVTT = (vttString: string) => {
//   const lines = vttString.split("\n");
//   const cues: TTranscriptCue[] = [];
//   let currentCue: TTranscriptCue | null = null;

//   lines.forEach((line) => {
//     if (line.includes("-->")) {
//       // Timestamp line
//       const [start, end] = line.split(" --> ");
//       currentCue = { start: parseFloat(start), end: parseFloat(end), text: "" };
//     } else if (line.trim() === "") {
//       // End of a cue
//       if (currentCue) {
//         cues.push(currentCue);
//         currentCue = null;
//       }
//     } else if (currentCue) {
//       // Caption text
//       currentCue.text += line + "\n";
//     }
//   });

//   if (currentCue) cues.push(currentCue); // Handle last cue
//   return cues;
// };
