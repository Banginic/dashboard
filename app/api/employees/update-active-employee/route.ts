import { NextResponse } from "next/server";
import { employeesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const employee_id = searchParams.get("employee_id");

    if (!employee_id) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Employee ID", data: [] },
        { status: 400 }
      );
    }
    const availableEmployee = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, employee_id))
      .limit(1);

    if (availableEmployee.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No Employee Available",
          data: [],
        },
        { status: 400 }
      );
    }

   const product =  await db
      .update(employeesTable)
      .set({isActive: !availableEmployee[0].isActive})
      .where(eq(employeesTable.id, employee_id))
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: "Employee Updated Successfully",
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
      { success: false, error: "Error Updating Employee", data: [] },
      { status: 500 }
    );
  }
}
