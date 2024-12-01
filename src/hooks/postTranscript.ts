import { TTranscriptMessage} from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";

const ROW_ID = 19;

export const postTranscript = async ({transcript}: {transcript: TTranscriptMessage[]}): Promise<void> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from('transcript').update({transcript: transcript}).eq('id', ROW_ID);;

    if (error) {
      console.error("Error updating transcript:", error);
      throw new Error("Error updating transcript");
    }
    
    return;
};

export default function usePostTranscript() {
  return useMutation({
    mutationFn: postTranscript,
  })
}
