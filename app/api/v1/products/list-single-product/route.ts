import { NextResponse } from "next/server";
import { productsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    
  try {
    const {searchParams} = new URL(req.url)
    const product_id = searchParams.get('product_id')

    if(!product_id){
           return NextResponse.json(
        { success: false, error: 'Please Provide a Product ID', data: [] },
        { status: 400 }
      );
    }
    const products = await db.select().from(productsTable)
    .where(eq(productsTable.id, product_id))
    .limit(1);

    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Product Available with this ID",
        data: 404,
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Product",
      data: products,
    });
  } catch (ex) {
    console.log(ex)
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
