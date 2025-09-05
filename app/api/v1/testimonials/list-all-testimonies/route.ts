import { NextResponse } from "next/server";
import { testimonialTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export async function GET() {
  try {
    const testimonies = await db.select().from(testimonialTable).limit(10);

    if (testimonies.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No Testimony Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Testimonies",
      data: testimonies,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Testimonies", data: [] },
      { status: 500 }
    );
  }
}
