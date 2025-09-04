import { EmployeeType } from "@/models/types";
import Link from "next/link";
import React from "react";


function EmployeeCard({ employee }: { employee: EmployeeType }) {
  const { id, name, position, createdAt } = employee;
  return (
    <Link
      href={`/kitchen/employees/${id}`}
      className="p-6 border text-neutral-700 cursor-pointer border-gray-300 shadow-md flex justify-between text-sm lg:text-[16px] items-center rounded-lg shadow-indigo-100 hover:shadow-indigo-200"
    >
      <div className=" ">
        <p className="text-neutral-500">Name</p>
        <p>{name}</p>
      </div>
      <div className=" ">
        <p className="text-neutral-500">Position</p>
        <p className="text-indigo-500">{position}</p>
      </div>
      <div className=" ">
        <p className="text-neutral-500">Hired Date</p>
        <p className="text-xs lg:text-sm text-green-600">
          {new Date(createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>
    </Link>
  );
}

export default EmployeeCard;
