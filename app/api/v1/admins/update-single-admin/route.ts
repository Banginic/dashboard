import { NextResponse } from "next/server";
import { usersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function PUT(req: Request) {
  try {
    const today = new Date()
    const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const admin_id = searchParams.get("admin_id");

    if (!admin_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Admin ID", data: [] },
        { status: 400 }
      );
    }
    const availableAdmin = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, admin_id))
      .limit(1);

    if (availableAdmin.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No Admin Available",
          data: [],
        },
        { status: 404 }
      );
    }
    //Return if it is the main admin
 if(availableAdmin[0].email === process.env.ADMIN_EMAIL){
    return NextResponse.json(
        {
          success: false,
          error: "You cannot update this admin",
          data: [],
        },
        { status: 403 }
      );
 }

 //Activate admin
 if(availableAdmin[0].role === 'user'){
     const activateAdmin =  await db
      .update(usersTable)
      .set({role: 'admin', updatedAt: today})
      .where(eq(usersTable.id, admin_id))
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: "Admin activated successfully",
        data: activateAdmin,
      },
      { status: 202 }
    );
 }

 //Disactivate admin
   const deactivateAdmin =  await db
      .update(usersTable)
      .set({role: 'user', updatedAt: today})
      .where(eq(usersTable.id, admin_id))
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: "Admin disactivated successfully",
        data: deactivateAdmin,
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
      { success: false, error: "Error Updating Admin", data: [] },
      { status: 500 }
    );
  }
}
