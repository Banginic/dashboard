

import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { employeesTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo") as File | null;
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const qualification = formData.get("qualification") as string;
    const position = formData.get("position") as string;


    if (!bio || !name || !position) {
      return NextResponse.json(
        { success: false, error: "Employee is required", data: [] },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Photo is required" },
        { status: 400 }
      );
    }

    const existEmployee = await db
      .select()
      .from(employeesTable)
      .where(
        and(
          eq(employeesTable.name, name),
          eq(employeesTable.email, email),
          eq(employeesTable.position, position)
        )
      )
      .limit(1);

    if (existEmployee.length === 1) {
      return NextResponse.json(
        { success: false, message: "Employee Already Exist", data: [] },
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
          { folder: "daisy-kitchen employees" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    await db
      .insert(employeesTable)
      .values({
        name,
        bio,
        phone,
        email,
        qualification,
        position,
        photo: uploadResponse.secure_url,
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
