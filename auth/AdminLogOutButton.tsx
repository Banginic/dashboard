"use client";
import { signOut } from "next-auth/react";
import React from "react";

function AdminLogOutButton({ children }: { children?: React.ReactNode }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/auth/sign-in" })}
      
    >
      {children || "Log Out"}
    </button>
  );
}

export default AdminLogOutButton;
