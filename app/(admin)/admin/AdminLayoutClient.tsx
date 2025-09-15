"use client";

import React from "react";
import { adminProvider } from "@/providers/admin-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function AdminLayoutClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={adminProvider}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
