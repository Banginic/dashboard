import { AdminType } from "@/models/types";
import React from "react";
import Link from "next/link";

function AdminUserCard({ adminUser }: { adminUser: AdminType}) {
  const { id, name , role } = adminUser
  return (
    <Link href={`/dashboard/admin-users/${id}`} className= "p-6 border text-neutral-700 cursor-pointer border-gray-300 shadow-md flex justify-between text-sm lg:text-[16px] items-center rounded-lg shadow-indigo-100 hover:shadow-indigo-200">
      <p className="flex  flex-col gap-">
        <span className="text-sm">User's name</span>
        <span>{name}</span>
      </p>

      <p className="flex  flex-col gap  mt-2">
        <span className="text-sm">Role</span>
        <span>{role}</span>
      </p>
    </Link>
  );
}

export default AdminUserCard;
