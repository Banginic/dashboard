import { NextResponse } from "next/server";
import { employeesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");

    if (!employeeId) {
      return NextResponse.json(
        { success: false, error: "Please Provide a Employee ID", data: [] },
        { status: 400 }
      );
    }
    const employee = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, employeeId))
      .limit(1);

    if (employee.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Employee Available",
        data: 400,
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Employee",
      data: employee,
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Employee", data: [] },
      { status: 500 }
    );
  }
}
