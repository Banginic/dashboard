import { NextResponse } from "next/server";
import { newsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { and, eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function PUT(req: Request) {
  try {
    const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const newsId = searchParams.get("news_id");
    const currentStatus = searchParams.get("current_status");

    if (!newsId) {
      return NextResponse.json(
        { success: false, error: "Please Provide a News ID", data: [] },
        { status: 400 }
      );
    }
    if (!currentStatus) {
      return NextResponse.json(
        { success: false, error: "Please Provide status", data: [] },
        { status: 400 }
      );
    }
    const activeNews = await db
      .select()
      .from(newsTable)
      .where(
        eq(newsTable.isActive, true),
      )
      .limit(1);

    if (activeNews.length === 1) {
     await db
      .update(newsTable)
      .set({isActive: false })
      .where(eq(newsTable.id, activeNews[0].id))
    }

   const news =  await db
      .update(newsTable)
      .set({isActive: currentStatus !== 'active' })
      .where(eq(newsTable.id, newsId))
      .returning()

    return NextResponse.json(
      {
        success: true, 
        message: "News Updated Successfully",
        data: news,
      },
      { status: 202 }
    );
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Updating News", data: [] },
      { status: 500 }
    );
  }
}
