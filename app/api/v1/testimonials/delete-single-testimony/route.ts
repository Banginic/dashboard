import { NextResponse } from "next/server";
import { testimonialTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function DELETE(req: Request) {
  try {
  const session = await protectRoutes(true)

    const { searchParams } = new URL(req.url);
    const testimonial_id = searchParams.get("testimonial_id");

    if (!testimonial_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide an Testimonial ID", data: [] },
        { status: 400 }
      );
    }
    const order = await db
      .select()
      .from(testimonialTable)
      .where(eq(testimonialTable.id, testimonial_id))
      .limit(1);

    if (order.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Testimonial Available",
        data: [],
      },
    {status: 404});
    }

    await db.delete(testimonialTable)
    .where(eq(testimonialTable.id, testimonial_id))
    .returning()


    return NextResponse.json(
      {
        success: true,
        message: "Testimonial Deleted Successfully",
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
      { success: false, error: "Error Deleting Testimonial", data: [] },
      { status: 500 }
    );
  }
}
