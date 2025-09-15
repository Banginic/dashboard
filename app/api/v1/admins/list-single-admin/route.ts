import { NextResponse } from "next/server";
import { usersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";



export async function GET(req: Request) {
  try {
    const session = await protectRoutes()
    const { searchParams } = new URL(req.url);
    const admin_id = searchParams.get("admin_id");

    if (!admin_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a admin ID", data: [] },
        { status: 400 }
      );
    }
    const admin = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, admin_id))
      .limit(1);

    if (admin.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No admin Available",
        data: [],
      },{
        status: 400
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching admin",
      data: admin,
    },
    
  );
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching admin", data: [] },
      { status: 500 }
    );
  }
}
