import { NextResponse } from "next/server";
import { BlogTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    
  try {
    const {searchParams} = new URL(req.url)
    const blog_id = searchParams.get('blog_id')

    if(!blog_id){
           return NextResponse.json(
        { success: false, error: 'Please Provide a Blog ID', data: [] },
        { status: 400 }
      );
    }
    const blog = await db.select().from(BlogTable)
    .where(eq(BlogTable.id, blog_id))
    .limit(1);

    if (blog.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Blog  Available",
        data: 404,
      });
    }
    return NextResponse.json({
      success: true,
      Blog: "Success Fetching Blog ",
      data: blog,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Blog ", data: [] },
      { status: 500 }
    );
  }
}
