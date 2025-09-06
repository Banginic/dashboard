import { NextResponse } from "next/server";
import { JobApplicationTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    
  try {
    const {searchParams} = new URL(req.url)
    const jobApplicationId = searchParams.get('job_application_id')

    if(!jobApplicationId){
           return NextResponse.json(
        { success: false, error: 'Please Provide a Job ID', data: [] },
        { status: 400 }
      );
    }
    const Job = await db.select().from(JobApplicationTable)
    .where(eq(JobApplicationTable.id, jobApplicationId))
    .limit(1);

    if (Job.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Job Application Available",
        data: 404,
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Job Applications",
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
      { success: false, error: "Error Fetching Job applications", data: [] },
      { status: 500 }
    );
  }
}
