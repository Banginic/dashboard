import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { BlogTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";
import { projectDetails } from "@/constants/project-details";
import { protectRoutes } from "@/lib/protectRoutes";


export async function POST(req: Request) {
  try {
    const session = await protectRoutes(true)
    
    const formData = await req.formData();
    const photo = formData.get("photo") as File | null;
    const avatar = formData.get("avatar") as File | null;
    const author = formData.get("author") as string;
    const post = formData.get("post") as string;
    const likes = formData.get("likes") as string;
    const category = formData.get("category") as string;

    if (!post || !author || !category) {
      return NextResponse.json(
        { success: false, error: " All credentials ar required", data: [] },
        { status: 400 }
      );
    }

    if (!photo) {
      return NextResponse.json(
        { success: false, message: "photo is required" },
        { status: 400 }
      );
    }

    if (!avatar) {
      return NextResponse.json(
        { success: false, message: "Avatar is required" },
        { status: 400 }
      );
    }

    const existBlog = await db
      .select()
      .from(BlogTable)
      .where(
        and(
          eq(BlogTable.author, author),
          eq(BlogTable.post, post),
          eq(BlogTable.category, category)
        )
      )
      .limit(1);

    if (existBlog.length === 1) {
      return NextResponse.json(
        { success: false, message: "Blog Already Posted", data: [] },
        { status: 400 }
      );
    }

    // Convert photo to base64 buffer
    const arrayBuffer = await photo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to cloudinary
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: `${projectDetails.projectName || "Dashboard"} Blog posts` },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const avatarBuffer = await avatar?.arrayBuffer();
    const avaBuffer = Buffer.from(avatarBuffer);

    const avatarResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `${projectDetails.projectName || "Dashboard"} Blog avatar`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(avaBuffer);
    });

    await db
      .insert(BlogTable)
      .values({
        author,
        post,
        avatar: avatarResponse.secure_url,
        category,
        likes,
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
