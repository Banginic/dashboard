import { NextResponse } from "next/server";
import { ordersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function GET(req: Request) {
    
  try {
    const session = await protectRoutes(true)
    const {searchParams} = new URL(req.url)
    const orderId = searchParams.get('order_d')

    if(!orderId){
           return NextResponse.json(
        { success: false, error: 'Please Provide a Order ID', data: [] },
        { status: 400 }
      );
    }
    const order = await db.select().from(ordersTable)
    .where(eq(ordersTable.id, orderId))
    .limit(1);

    if (order.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Order Available",
        data: 400,
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Order",
      data: order,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Order", data: [] },
      { status: 500 }
    );
  }
}
