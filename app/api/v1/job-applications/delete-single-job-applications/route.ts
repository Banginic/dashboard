import { NextResponse } from "next/server";
import { JobApplicationTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const job_application_id = searchParams.get("job_application_id");

    if (!job_application_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Job ID", data: [] },
        { status: 400 }
      );
    }
    const jobApplication = await db
      .select()
      .from(JobApplicationTable)
      .where(eq(JobApplicationTable.id, job_application_id))
      .limit(1);

    if (jobApplication.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Job Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(JobApplicationTable)
    .where(eq(JobApplicationTable.id, job_application_id))
    .returning()


    return NextResponse.json(
      {
        success: true,
        Job: "Job Deleted Successfully",
        data: [],
      },
      { status: 203 }
    );
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Deleting Job Application", data: [] },
      { status: 500 }
    );
  }
}
