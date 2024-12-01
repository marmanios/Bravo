import { createClient } from "@/utils/supabase/server";
import { TTranscriptMessage } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const ROW_ID = 19;


export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("transcript")
      .select("*")
      .eq("id", ROW_ID);

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

export async function PATCH(req: NextRequest) {
  try {
    const reqJson = await req.json();
    const reqTranscript: TTranscriptMessage[] = reqJson.transcript;

    const supabase = await createClient();
    const { data: fetchedData, error: fetchedError } = await supabase.from('transcript').select('*').eq('id', ROW_ID);
    if (fetchedData?.length === 0) {
      const { data, error } = await supabase.from('transcript').insert({id: ROW_ID, transcript: reqTranscript});
    } else {
      const { data, error } = await supabase.from('transcript').update({transcript: reqTranscript}).eq('id', ROW_ID);;
    }

    if (fetchedError) {
      console.error("Error updating transcript:", fetchedError);
      throw new Error("Error updating transcript");
    }

    return NextResponse.json(
      {
        data: null,
        message: "Successfully updated transcript",
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
