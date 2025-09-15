import { aj } from "@/lib/arcjet";
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // 1️⃣ Arcjet protection
  const decision = await aj.protect(req, { requested: 1 });
  if (decision.isDenied()) {
    return NextResponse.json(
      {
        error: "Access denied",
        reason: decision.reason,
      },
      { status: 403 }
    );
  }

  // 2️⃣ Get JWT token
  const token = await getToken({ req });

  // 3️⃣ Redirect unauthenticated users to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // 4️⃣ Role-based protection
  if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/-sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};
