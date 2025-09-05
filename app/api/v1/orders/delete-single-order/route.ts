import { NextResponse } from "next/server";
import { ordersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Order ID", data: [] },
        { status: 400 }
      );
    }
    const order = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, Number(orderId)))
      .limit(1);

    if (order.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Order Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(ordersTable)
    .where(eq(ordersTable.id, Number(orderId)))
    .returning()


    return NextResponse.json(
      {
        success: true,
        message: "Order Deleted Successfully",
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
      { success: false, error: "Error Deleting Order", data: [] },
      { status: 500 }
    );
  }
}
