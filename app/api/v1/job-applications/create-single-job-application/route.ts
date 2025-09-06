

import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { JobApplicationTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";
import { projectDetails } from "@/constants/project-details";

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url)
    const jobId = searchParams.get('job_id')
  try {
    const formData = await req.formData();
    const cv = formData.get("cv") as File | null;
    const name = formData.get("name") as string;
    const motivation = formData.get("motivation") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
  


    if (!motivation || !name || !phone) {
      return NextResponse.json(
        { success: false, error: " All credentials ar required", data: [] },
        { status: 400 }
      );
    }

    if (!cv) {
      return NextResponse.json(
        { success: false, message: "CV is required" },
        { status: 400 }
      );
    }
    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "Job ID is required" },
        { status: 400 }
      );
    }

    const existEmployee = await db
      .select()
      .from(JobApplicationTable)
      .where(
        and(
          eq(JobApplicationTable.name, name),
          eq(JobApplicationTable.email, email),
          eq(JobApplicationTable.jobId, jobId)
        )
      )
      .limit(1);

    if (existEmployee.length === 1) {
      return NextResponse.json(
        { success: false, message: "Already Applied", data: [] },
        { status: 400 }
      );
    }

    // Convert cv to base64 buffer
    const arrayBuffer = await cv.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to cloudinary
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: `${projectDetails.projectName || 'Dashboard'} Job applications` },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    await db
      .insert(JobApplicationTable)
      .values({
        name,
        jobId,
        motivation,
        phone,
        email,
        cv: uploadResponse.secure_url,
      })
      .returning();

    return NextResponse.json(
      { success: true, message: "Employee created successfully", data: [] },
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
      { success: false, error: "Employee Server Error", data: [] },
      { status: 500 }
    );
  }
}
