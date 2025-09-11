"use client";

import React from "react";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";



export default function DashboardLayoutClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {


  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={dashboardProvider}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
