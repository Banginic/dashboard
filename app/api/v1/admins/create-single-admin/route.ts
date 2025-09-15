import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { usersTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req: Request) {
  try {
  const session = await protectRoutes(true)
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, error: "User detail is required", data: [] },
        { status: 400 }
      );
    }
    const { name, email, phone, password } = body;

    const existingUser = await db.select()
    .from(usersTable)
    .where( and(
        eq(
        usersTable.name, name),
        eq( usersTable.email, email)
    ))
    .limit(1)
    
    if(existingUser.length === 1){
          return NextResponse.json(
      { success: false, message: "User Already Exist.", data: [] },
      { status: 400 }
    );
    }
    const hashedPassword = await hashPassword(password)

 const user = await db
      .insert(usersTable)
      .values({ name, email, phone, password: hashedPassword, role: 'admin' });

    return NextResponse.json(
      { success: true, message: "User created successfully", data: user },
      { status: 201 }
    );
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Users Server Error", data: [] },
      { status: 500 }
    );
  }
}
