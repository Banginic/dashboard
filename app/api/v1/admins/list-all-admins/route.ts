import { NextResponse } from "next/server";
import { usersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { protectRoutes } from "@/lib/protectRoutes";



export async function GET(req: Request) {
  try {
    const session = await protectRoutes(true);
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const admin = await db
      .select()
      .from(usersTable)
      .limit(Number(limit) || 5);

    if (admin.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No other admin available",
        data: [],
      });
    }
    return NextResponse.json(
      {
        success: true,
        message: "Success Fetching Admin",
        data: admin,
      },
      {
        status: 200,
     
      }
    );
  } catch (ex: unknown) {
    console.log(ex)
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Admin", data: [] },
      { status: 500 }
    );
  }
}
