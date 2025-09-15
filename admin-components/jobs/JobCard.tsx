import { JobType } from "@/models/types";
import Link from "next/link";
import React from "react";

function JobCard({ job }: { job: JobType }) {
  const { id, title, location, createdAt } = job;
  return (
    <Link
      href={`/admin/jobs/${id}`}
      className="p-6 border text-foreground cursor-pointer border-secondary-foreground/50 bg-secondary shadow-md flex justify-between text-sm lg:text-[16px] items-center rounded-lg "
    >
      <div className=" ">
        <p className="text-foreground/70">Title</p>
        <p>{title}</p>
      </div>
      <div className=" ">
        <p className="text-foreground/70">Location</p>
        <p>{location}</p>
      </div>

      <p className="text-xs lg:text-sm text-green-600">
        {new Date(createdAt).toLocaleDateString("en-GB")}
      </p>
    </Link>
  );
}

export default JobCard;
