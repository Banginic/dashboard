import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "react-day-picker";
import { Badge, CalendarDays, MapPin } from "lucide-react";
import { JobType } from "@/models/types";

function JobDetail({ job}: { job: JobType}) {
    const { id, title, location, description, createdAt, latestDate } = job
  return (
    <div className="container max-w-3xl mx-auto">
      <Card className="shadow-lg rounded-2xl border ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Info */}
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" /> {location}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-green-500" />
              Posted: <p className="bg-secondary rounded-md p-1">{new Date(createdAt).toLocaleDateString('en-GB')}</p>
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-red-500" />
              Apply Before: <p className="bg-red-100 rounded-md p-1 text-red-500">{new Date(latestDate).toLocaleDateString('en-GB')}</p>
            </p>
          </div>

          {/* Job Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Apply Button */}
          <button  className="w-full bg-accent py-2.5 rounded-md trans hover:scale-105 cursor-pointer text-accent-foreground">
            Apply Now
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default JobDetail;
