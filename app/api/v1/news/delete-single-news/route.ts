import { NextResponse } from "next/server";
import { newsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function DELETE(req: Request) {
  try {
    const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const  news_id = searchParams.get("news_id");

    if (! news_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a News ID", data: [] },
        { status: 400 }
      );
    }
    const products = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, news_id))
      .limit(1);

    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No News Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(newsTable)
    .where(eq(newsTable.id, news_id))
    .returning()


    return NextResponse.json(
      {
        success: true,
        message: "News Deleted Successfully",
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
      { success: false, error: "Error Deleting News", data: [] },
      { status: 500 }
    );
  }
}
