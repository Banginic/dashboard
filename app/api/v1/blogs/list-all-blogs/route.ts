import { NextResponse } from "next/server";
import { BlogTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export const revalidate = 120;

export async function GET() {
  try {
    const blogs = await db.select().from(BlogTable).limit(10);

    if (blogs.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No blogs Application Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching blogs applications",
      data: blogs,
    },
    {
      status: 200,
      headers: {'Cache-Control': "public, s-maxage=120, stale-while-revalidating=300"}
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching blogs Applications", data: [] },
      { status: 500 }
    );
  }
}
