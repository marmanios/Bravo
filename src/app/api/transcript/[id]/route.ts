import { createClient } from "@/utils/supabase/server";
import { TTranscriptMessage } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params: {id: string}}) {
  try {
    const id = params.id;
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("transcript")
      .select("*")
      .eq("log_id", id);

    if (error) {
      console.error("Error fetching transcript:", error);
      throw new Error("Error fetching transcript");
    }

    return NextResponse.json(
      {
        data: data[0],
        message: "Successfully retrieved transcript",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /call_logs:", error);

    // Return an error response
    return NextResponse.json(
      {
        data: null,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
