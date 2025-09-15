import { NextResponse } from "next/server";
import { employeesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";

export const revalidate = 120;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = searchParams.get('limit')
  try {
    const employees = await db.select()
    .from(employeesTable)
    .limit(Number(limit) || 10);

    if (employees.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No Employee Available",
        data: [],
      });
    }
    return NextResponse.json({
      success: true,
      message: "Success Fetching Employees",
      data: employees,
    },{
      status: 200,
      headers: {'Cache-Control': "public, s-maxage=120, stale-while-revalidating=300"}
    });
  } catch (ex) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching Employees", data: [] },
      { status: 500 }
    );
  }
}
