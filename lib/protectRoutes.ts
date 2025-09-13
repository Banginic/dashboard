// lib/protectRoutes.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function protectRoutes(requireAdmin = false) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized: Please log in.");
  }

  if (
    requireAdmin &&
    (!session.user || session.user.role !== "admin")
  ) {
    throw new Error("Forbidden: Admin access required.");
  }

  return session;
}
