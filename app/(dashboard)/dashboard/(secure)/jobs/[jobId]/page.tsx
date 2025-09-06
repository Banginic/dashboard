"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  NoData,
  ErrorFetching,
  JobDetails,
  Title,
  Back,
  JobDetailsSkeleton,
} from "@/dashboard-components/index";
import { useFetch } from "@/hooks/useFetch";
import { JobTypes } from "@/models/types";
import { projectDetails } from "@/constants/project-details";

function JobDetail({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const fetchDetails = {
    endpoint: `/jobs/list-single-job?job_id=${jobId}`,
    method: "GET",
    title: "job",
  };
  const { data, isPending, refetch, isError } = useQuery({
    queryKey: [`${projectDetails.projectName || 'dashboard'}-messages-${jobId}`],
    queryFn: () => useFetch<JobTypes>(fetchDetails),
  });

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/dashboard/jobs" />
      </div>
      <Title text1="Job" text2="Details" />
      <div className="mt-12">
        {isPending ? (
         <JobDetailsSkeleton />
        ) : isError && !data?.data ? (
          <ErrorFetching message="Job" retry={() => refetch} />
        ) : data.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <JobDetails job={data.data[0]} />
        )}
      </div>
    </section>
  );
}

export default JobDetail;
