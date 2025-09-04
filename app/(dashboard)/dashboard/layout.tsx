"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { kitchenClient } from "../queryProviders/kitchenProvider";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={kitchenClient}>
      <div className="bg-gradient-to-r from-yellow-50  via-purple-50 to bg-pink-50">
        {children}
      </div>
    </QueryClientProvider>
  );
}

export default AdminLayout;
