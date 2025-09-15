import { NextResponse } from "next/server";
import { JobTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function DELETE(req: Request) {
  try {
    const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const job_id = searchParams.get("job_id");

    if (!job_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Job ID", data: [] },
        { status: 400 }
      );
    }
    const job = await db
      .select()
      .from(JobTable)
      .where(eq(JobTable.id, job_id))
      .limit(1);

    if (job.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Job Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(JobTable)
    .where(eq(JobTable.id, job_id))
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
      { success: false, error: "Error Deleting Job", data: [] },
      { status: 500 }
    );
  }
}
