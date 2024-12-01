import { TTranscriptMessage } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export const postTranscript = async ({
  transcript,
  logID,
}: {
  transcript: TTranscriptMessage[];
  logID: number;
}): Promise<void> => {
  try {
    await fetch(`/api/transcript`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, logID }),
    });
  } catch (error) {
    console.error("Error updating transcript:", error);
    throw new Error("Error updating transcript");
  }
};

export default function usePostTranscript() {
  return useMutation({
    mutationFn: postTranscript,
  });
}
