import { NextResponse } from "next/server";
import { productsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export const revalidate = 120;

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const  limit = searchParams.get('limit' )
  try {
    const products = await db.select().from(productsTable).limit(Number(limit) || 70);

    if (products.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No Project Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Project",
      data: products,
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
      { success: false, error: "Error Fetching Project", data: [] },
      { status: 500 }
    );
  }
}
