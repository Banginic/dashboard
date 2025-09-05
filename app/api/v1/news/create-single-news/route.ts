import { NextResponse } from "next/server";
import { newsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "News body is required.",
          data: [],
        },
        { status: 400 }
      );
    }
    const { subject, message } = body;
    const activeNews = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.isActive, true))
      .limit(1);

    //DisActivate current active news
    if (activeNews.length === 1) {
      await db
        .update(newsTable)
        .set({ isActive: false })
        .where(eq(newsTable.id, activeNews[0].id));
    }
    // Add and activate new active news
    const newNews = await db
      .insert(newsTable)
      .values({ subject, body: message, isActive: true });

    return NextResponse.json({
      success: true,
      message: "News created successfully.",
      data: newNews,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error creating News", data: [] },
      { status: 500 }
    );
  }
}
