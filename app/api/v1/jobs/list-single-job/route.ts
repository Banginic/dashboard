import { NextResponse } from "next/server";
import { JobTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    
  try {
    const {searchParams} = new URL(req.url)
    const jobId = searchParams.get('job_id')

    if(!jobId){
           return NextResponse.json(
        { success: false, error: 'Please Provide a Job ID', data: [] },
        { status: 400 }
      );
    }
    const Job = await db.select().from(JobTable)
    .where(eq(JobTable.id, jobId))
    .limit(1);

    if (Job.length === 0) {
      return NextResponse.json({
        success: false,
        Job: "No Job Available",
        data: 404,
      });
    }
    return NextResponse.json({
      success: true,
      Job: "Success Fetching Job",
      data: Job,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Job", data: [] },
      { status: 500 }
    );
  }
}
