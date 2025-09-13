import { db } from "@/drizzle/index";
import { usersTable } from "@/drizzle/schema";
import { hashPassword } from "@/lib/bcrypt";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Signup details are Needed", data: [] },
        { status: 400 }
      );
    }
    const { email, password, phone, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Signup details are Needed", data: [] },
        { status: 400 }
      );
    }

    if (email === process.env.ADMIN_email!) {
      return NextResponse.json(
        { success: false, message: "User already exist.", data: [] },
        { status: 400 }
      );
    }

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length === 1) {
       return NextResponse.json(
        { success: false, message: "User already exist.", data: [] },
        { status: 400 }
      );
    }
 const hashedPassword = await hashPassword(password)

    const newUser = await db.insert(usersTable)
    .values({name, email: email, password: hashedPassword, role: 'admin', phone})
  


    return NextResponse.json(
        { success: true, message: "User created successfully", data: newUser },
        { status: 201 }
      );


  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, message: ex.message, data: [] },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    { success: false, message: "Error Signing up", data: [] },
    { status: 500 }
  );
}
