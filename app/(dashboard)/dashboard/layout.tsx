"use client";
import React from "react";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { QueryClientProvider } from "@tanstack/react-query";


function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={dashboardProvider}>
      <div className="bg-gradient-to-r from-yellow-50  via-purple-50 to bg-pink-50">
        {children}
      </div>
    </QueryClientProvider>
  );
}

export default AdminLayout;
