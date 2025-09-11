import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardLayoutClient from "./DashboardLayoutClient";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/auth/sign-in"); // or wherever your login page is
  }

  return <DashboardLayoutClient session={session}>{children}</DashboardLayoutClient>;
}
