import { NextResponse } from "next/server";
import { BlogTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const blog_id = searchParams.get("blog_id");

    if (!blog_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Blog ID", data: [] },
        { status: 400 }
      );
    }
    const blog = await db
      .select()
      .from(BlogTable)
      .where(eq(BlogTable.id, blog_id))
      .limit(1);

    if (blog.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Blog Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(BlogTable)
    .where(eq(BlogTable.id, blog_id))
    .returning()


    return NextResponse.json(
      {
        success: true,
        Job: "Blog Deleted Successfully",
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
      { success: false, error: "Error Deleting Blog Application", data: [] },
      { status: 500 }
    );
  }
}
