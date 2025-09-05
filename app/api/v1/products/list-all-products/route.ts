import { NextResponse } from "next/server";
import { productsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const  limit = searchParams.get('limit' )
  try {
    const products = await db.select().from(productsTable).limit(Number(limit) || 70);

    if (products.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No Products Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Products",
      data: products,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Products", data: [] },
      { status: 500 }
    );
  }
}
