import { NextResponse } from "next/server";
import { messagesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export async function GET() {
  try {
    const messages = await db.select().from(messagesTable).limit(10);

    if (messages.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No Messages Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Messages",
      data: messages,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Messages", data: [] },
      { status: 500 }
    );
  }
}
