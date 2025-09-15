import { NextResponse } from "next/server";
import { employeesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";

export async function DELETE(req: Request) {
  try {
    const session = await protectRoutes(true)
    const { searchParams } = new URL(req.url);
    const employee_id = searchParams.get("employee_id");

    if (!employee_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide an Employee ID", data: [] },
        { status: 400 }
      );
    }
    const employee = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, employee_id))
      .limit(1);

    if (employee.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No Employee Available",
        data: [],
      },
    {status: 400});
    }

    await db.delete(employeesTable)
    .where(eq(employeesTable.id, employee_id))
    .returning()


    return NextResponse.json(
      {
        success: true,
        message: "Employee Deleted Successfully",
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
      { success: false, error: "Error Deleting Employee", data: [] },
      { status: 500 }
    );
  }
}
