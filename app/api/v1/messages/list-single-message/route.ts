import { NextResponse } from "next/server";
import { messagesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export const revalidate = 120;

export async function GET(req: Request) {
  
  try {
    const session = await protectRoutes(true)
    const {searchParams} = new URL(req.url)
    const messageId = searchParams.get('messageId')

    if(!messageId){
           return NextResponse.json(
        { success: false, error: 'Please Provide a Message ID', data: [] },
        { status: 400 }
      );
    }
    const message = await db.select().from(messagesTable)
    .where(eq(messagesTable.id, messageId))
    .limit(1);

    if (message.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Message Available",
        data: 400,
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Message",
      data: message,
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
      { success: false, error: "Error Fetching Message", data: [] },
      { status: 500 }
    );
  }
}
