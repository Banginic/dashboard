import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { messagesTable } from "@/drizzle/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Message is required", data: [] },
        { status: 400 }
      );
    }
    const { name, email, phone, subject, message } = body;

    await db
      .insert(messagesTable)
      .values({ name, email, phone, subject, message });

    return NextResponse.json(
      { success: true, message: "Message sent successfully", data: [] },
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
      { success: false, error: "Message Server Error", data: [] },
      { status: 500 }
    );
  }
}
