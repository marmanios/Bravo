import { createClient } from "@/utils/supabase/server";
import { TCallLogInsertDB } from "@/utils/types";
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

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = (await request.json()) as TCallLogInsertDB;

    console.log("bid", body);

    // Extract fields from the body
    const {
      id,
      priority,
      status,
      type,
      description,
      created_at,
      ended_at,
      name,
      phone_number,
      address,
      city,
      location_description,
      response_type,
      response_status,
      dispatched_at,
      latitude,
      longitude,
    } = body;

    const dataToInsert = {
      id: id || undefined,
      priority,
      status,
      type,
      description,
      created_at,
      ended_at,
      name,
      phone_number,
      address,
      city,
      location_description,
      response_type,
      response_status,
      dispatched_at,
      latitude,
      longitude,
    };

    console.log("Body", body);
    console.log("dataToInsert", dataToInsert);

    // Insert or update the record
    const { data, error } = await supabase
      .from("call_logs")
      .upsert(dataToInsert, { onConflict: "id" })
      .select()
      .single(); // Use "id" for conflict resolution

    if (error) {
      console.error("Error upserting call log:", error);
      return NextResponse.json(
        { message: "Failed to create or update the call log", error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data,
        message: id
          ? "Call log updated successfully"
          : "New call log created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /call_logs:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred", error },
      { status: 500 }
    );
  }
}
