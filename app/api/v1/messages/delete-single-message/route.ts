import { NextResponse } from "next/server";
import { messagesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function DELETE(req: Request) {
  try {
    const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const messageId = searchParams.get("messageId");

    if (!messageId) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Message ID", data: [] },
        { status: 400 }
      );
    }
    const message = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.id, messageId))
      .limit(1);

    if (message.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Message Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(messagesTable)
    .where(eq(messagesTable.id, messageId))
    .returning()


    return NextResponse.json(
      {
        success: true,
        message: "Message Deleted Successfully",
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
      { success: false, error: "Error Deleting Message", data: [] },
      { status: 500 }
    );
  }
}
