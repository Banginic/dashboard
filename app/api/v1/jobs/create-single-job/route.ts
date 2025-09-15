import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { JobTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function POST(req: Request) {
  try {
  const session = await protectRoutes(true)
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Job detail is required", data: [] },
        { status: 400 }
      );
    }
    const { title, location, description, } = body;

    const existingJob = await db.select()
    .from(JobTable)
    .where( and(
        eq(
        JobTable.title, title),
        eq( JobTable.location, location)
    ))
    .limit(1)
    
    if(existingJob.length === 1){
          return NextResponse.json(
      { success: false, message: "Job Already Exist.", data: [] },
      { status: 400 }
    );
    }

 const job = await db
      .insert(JobTable)
      .values({ title, location, description, latestDate: new Date() });

    return NextResponse.json(
      { success: true, message: "Job created successfully", data: job },
      { status: 201 }
    );
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Jobs Server Error", data: [] },
      { status: 500 }
    );
  }
}
