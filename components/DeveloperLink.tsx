import { banginic_logo } from "@/assets/photos";
import Image from "next/image";
import React from "react";

function DeveloperLink() {
  return (
    <a
    title="Visit developer's page"
      href="https://banginic.vercel.app"
      target="blank"
      className="text-sm space-x-2 border mt-8 lg:mt-0 border-indigo-100/20 hover:border-indigo-100 p-2 rounded trans"
    >
      <span className="text-xs">Developed by</span>
      <div className="flex items-center gap-2">
        <Image
          src={banginic_logo}
          width={25}
          height={32}
          alt="Developed by Banginic"
        />
        <span className="text-indigo-100">Banginic</span>
      </div>
    </a>
  );
}

export default DeveloperLink;
