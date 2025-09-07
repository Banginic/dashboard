import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { messagesTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Message is required", data: [] },
        { status: 400 }
      );
    }
    const { name, email, phone, subject, message } = body;

    const existingJob = await db.select()
    .from(messagesTable)
    .where( and(
        eq(
        messagesTable.name, name),
        eq( messagesTable.subject, subject)
    ))
    .limit(1)
    
    if(existingJob.length === 1){
          return NextResponse.json(
      { success: false, message: "Message Already Exist.", data: [] },
      { status: 400 }
    );
    }

    await db
      .insert(messagesTable)
      .values({ name, email, phone, subject, message });

    return NextResponse.json(
      { success: true, message: "Message created successfully", data: [] },
      { status: 201 }
    );
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, message: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Message Server Error", data: [] },
      { status: 500 }
    );
  }
}
