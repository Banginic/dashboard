import { NextResponse } from "next/server";
import { productsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function DELETE(req: Request) {
  try {
    const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    if (!product_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Project ID", data: [] },
        { status: 400 }
      );
    }
    const products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, product_id))
      .limit(1);

    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Product Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(productsTable)
    .where(eq(productsTable.id, product_id))
    .returning()


    return NextResponse.json(
      {
        success: true,
        message: "Project Deleted Successfully",
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
      { success: false, error: "Error Deleting Project", data: [] },
      { status: 500 }
    );
  }
}
