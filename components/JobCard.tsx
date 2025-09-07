import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge, CalendarDays, MapPin } from "lucide-react";
import { JobType } from "@/models/types";
import Link from "next/link";

function JobCard({ job }: { job: JobType }) {
  const { id, title, location, createdAt, latestDate } = job;
  return (
    <Link href={`/jobs/${id}`}>
      <Card className="shadow-lg hover:shadow-xl transition rounded-2xl border ">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            {location}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-green-500" />
            Posted:{" "}
            <p className="bg-secondary rounded-md p-1">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </p>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-red-500" />
            Apply Before:{" "}
            <p className="bg-red-100 text-red-500 rounded-md p-1">
              {new Date(latestDate).toLocaleDateString("en-GB")}
            </p>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default JobCard;
