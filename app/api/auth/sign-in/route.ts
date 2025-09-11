import { db } from "@/drizzle/index";
import { usersTable } from "@/drizzle/schema";
import { comparePassword } from "@/lib/bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Login details are Needed", data: [] },
        { status: 400 }
      );
    }
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Login details are Needed", data: [] },
        { status: 400 }
      );
    }

    if (username !== process.env.ADMIN_USERNAME!) {
      return NextResponse.json(
        { success: false, message: "Incorrect Email or Password", data: [] },
        { status: 401 }
      );
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, username))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { success: false, message: "Incorrect Email or Password", data: [] },
        { status: 401 }
      );
    }
    const isValidPassword = await comparePassword(user[0].password, password);

    if(!isValidPassword){
        return NextResponse.json(
        { success: false, message: "Incorrect Email or Password", data: [] },
        { status: 401 }
      );
    }
    return NextResponse.json(
        { success: true, message: "User is available", data: user },
        { status: 200 }
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
    { success: false, message: "Error Logging in", data: [] },
    { status: 500 }
  );
}
