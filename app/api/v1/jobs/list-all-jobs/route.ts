import { NextResponse } from "next/server";
import { JobTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export async function GET(req: Request) {
  const { searchParams } = new URL (req.url)
  const limit = searchParams.get('limit')
  try {
    const jobs = await db.select().from(JobTable).limit(Number(limit) || 10);

    if (jobs.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No jobs Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching jobs",
      data: jobs,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching jobs", data: [] },
      { status: 500 }
    );
  }
}
