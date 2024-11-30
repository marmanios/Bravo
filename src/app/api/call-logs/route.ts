import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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
