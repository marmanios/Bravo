import { createClient } from "@/utils/supabase/server";
import { TTranscriptMessage } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("call_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching call logs:", error);
      throw new Error("Error fetching call logs");
    }

    return NextResponse.json(
      {
        data,
        message: "Successfully retrieved call logs",
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
    const ROW_ID = 19;
    const reqJson = await req.json();
    const reqTranscript: TTranscriptMessage[] = reqJson.transcript;

    const supabase = await createClient();
    const { data: fetchedData, error: fetchedError } = await supabase.from('transcript').select('*').eq('id', ROW_ID);
    if (fetchedData?.length === 0) {
      const { data, error } = await supabase.from('transcript').insert({id: ROW_ID, transcript: reqTranscript});
    } else {
      const { data, error } = await supabase.from('transcript').update({transcript: reqTranscript}).eq('id', ROW_ID);;
    }

    if (error) {
      console.error("Error fetching call logs:", error);
      throw new Error("Error fetching call logs");
    }

    return NextResponse.json(
      {
        data,
        message: "Successfully retrieved call logs",
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
