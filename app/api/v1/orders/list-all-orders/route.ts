import { NextResponse } from "next/server";
import { ordersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { protectRoutes } from "@/lib/protectRoutes";

export async function GET() {
  try {
    const session = await protectRoutes(true)
    const orders = await db.select().from(ordersTable).limit(20);

    if (orders.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No Order Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Orders",
      data: orders,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Orders", data: [] },
      { status: 500 }
    );
  }
}
