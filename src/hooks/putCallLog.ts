import { TCallLog, TCallLogInsertDB, TTranscriptMessage } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const putCallLog = async (callLog: TCallLogInsertDB): Promise<void> => {
  try {
    await fetch(`/api/call-logs`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...callLog }),
    });
  } catch (error) {
    console.error("Error upserting call logs:", error);
    throw new Error("Error upserting call logs");
  }
};

export default function usePutCallLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (callLog: TCallLogInsertDB) => putCallLog(callLog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["call-logs"] });
      toast({
        title: "Successfully updated logs",
      });
    },
    onError: (err) => {
      toast({
        title: "Failed to update logs",
        description: err.message,
      });
    },
  });
}
