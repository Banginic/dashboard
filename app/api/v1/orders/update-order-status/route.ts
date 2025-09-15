import { NextResponse } from "next/server";
import { ordersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function PUT(req: Request) {
    
  try {
const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Order ID", data: [] },
        { status: 400 }
      );
    }
    if (!status) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Order Status", data: [] },
        { status: 400 }
      );
    }
    const availableProduct = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, orderId))
      .limit(1);

    if (availableProduct.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No Order Available",
          data: [],
        },
        { status: 400 }
      );
    }

   const product =  await db
      .update(ordersTable)
      .set({ status })
      .where(eq(ordersTable.id, orderId))
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: "Order Updated Successfully",
        data: product,
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
      { success: false, error: "Error Updating Order", data: [] },
      { status: 500 }
    );
  }
}
