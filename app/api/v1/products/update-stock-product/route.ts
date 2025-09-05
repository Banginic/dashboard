import { NextResponse } from "next/server";
import { productsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    if (!product_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Product ID", data: [] },
        { status: 400 }
      );
    }
    const availableProduct = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, product_id))
      .limit(1);

    if (availableProduct.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No Product Available",
          data: [],
        },
        { status: 400 }
      );
    }

   const product =  await db
      .update(productsTable)
      .set({isInStock: !availableProduct[0].isInStock})
      .where(eq(productsTable.id, product_id))
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: "Product Updated Successfully",
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
      { success: false, error: "Error Updating Product", data: [] },
      { status: 500 }
    );
  }
}
