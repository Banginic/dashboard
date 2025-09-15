import { NextResponse } from "next/server";
import { newsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { desc } from "drizzle-orm";

export const revalidate = 120;

export async function GET() {
  try {
    const news = await db.select()
    .from(newsTable)
    .orderBy(desc(newsTable.isActive))
    .limit(15);

    if (news.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No News Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching News",
      data: news,
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
      { success: false, error: "Error Fetching News", data: [] },
      { status: 500 }
    );
  }
}
