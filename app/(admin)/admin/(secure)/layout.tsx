"use client";

import { Navbar, Sidebar } from "@/admin-components/index";
import React, { useState } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setSidebar] = useState(false);
  return (
    <div className="relative bg-primary text-primary-forground ">
      <Navbar showSidebar={showSidebar} setSidebar={setSidebar} />
      <div className="">
        <Sidebar showSidebar={showSidebar} setSidebar={setSidebar} />
        <div className="bg-background text-foreground rounded-lg  w-full lg:w-[94vw] h-[90dvh] lg:h-[88dvh] fixed top-[10dvh] lg:top-[12dvh] right-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
