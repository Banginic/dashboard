import { aj } from "@/lib/arcjet";
import { NextResponse, NextRequest } from "next/server";



export async function middleware(req: NextRequest) {
  const decision = await aj.protect(req, { requested: 1 });

  if (decision.isDenied()) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // protect all API routes
};
