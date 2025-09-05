import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { testimonialTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo") as File | null;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const project = formData.get("project") as string;
    const rating = formData.get("rating") as string;

    if (!message || !name || !project) {
      return NextResponse.json(
        { success: false, error: "Testimony is required", data: [] },
        { status: 400 }
      );
    }
    if (!file) {
        return NextResponse.json(
            { success: false, message: "Photo is required" },
            { status: 400 }
        );
    }
    console.log(file)

    const existTestimony = await db
      .select()
      .from(testimonialTable)
      .where(
        and(
          eq(testimonialTable.name, name),
          eq(testimonialTable.project, project)
        )
      )
      .limit(1);

    if (existTestimony.length === 1) {

      return NextResponse.json(
        { success: false, message: "Testimonies Already Exist", data: [] },
        { status: 400 }
      );
    }

    // Convert file to base64 buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to cloudinary
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "daisy-kitchen testimonials" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    await db
      .insert(testimonialTable)
      .values({
        name,
        message,
        project,
        rating: Number(rating),
        photo: uploadResponse.secure_url,
      })
      .returning();

    return NextResponse.json(
      { success: true, message: "Testimonies created successfully", data: [] },
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
      { success: false, error: "Testimonies Server Error", data: [] },
      { status: 500 }
    );
  }
}
