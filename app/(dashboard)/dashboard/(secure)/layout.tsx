"use client";
import Navbar from "@/components/adminComponents/Navbar";
import Sidebar from "@/components/adminComponents/Sidebar";
import React, { useState } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
const [ showSidebar, setSidebar ] = useState(false)
  return (
    <div className="relative bg-gradient-to-r from-yellow-50  via-purple-50 to bg-pink-50">
      <Navbar showSidebar={showSidebar} setSidebar={setSidebar} />
      <div className="">
        <Sidebar showSidebar ={showSidebar} setSidebar={setSidebar} />
        <div className="bg-gradient-to-br from-pink-50 overflow-hidden to-blue-50 rounded-lg  w-full lg:w-[94vw] h-[90dvh] lg:h-[88dvh] fixed top-[10dvh] lg:top-[12dvh] right-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
