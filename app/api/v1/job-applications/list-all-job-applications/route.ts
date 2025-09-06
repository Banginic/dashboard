import { NextResponse } from "next/server";
import { JobApplicationTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export async function GET() {
  try {
    const jobApplications = await db.select().from(JobApplicationTable).limit(10);

    if (jobApplications.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No jobs Application Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching jobs applications",
      data: jobApplications,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching job Applications", data: [] },
      { status: 500 }
    );
  }
}
