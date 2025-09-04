"use client";
import React from "react";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { QueryClientProvider } from "@tanstack/react-query";


function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={dashboardProvider}>
      <div className="">
        {children}
      </div>
    </QueryClientProvider>
  );
}

export default AdminLayout;
