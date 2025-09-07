"use client";
import { notFound } from "next/navigation";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectDetails } from "@/constants/project-details";
import { useFetch } from "@/hooks/useFetch";
import { JobTypes } from "@/models/types";
import {
  Back,
  ErrorFetching,
  NoData,
  Title,
} from "@/dashboard-components/index";
import { JobDetail } from "@/components/index";

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);

  if (!jobId) {
    notFound();
  }
  const fetchDetails = {
    endpoint: `/jobs/list-single-job?job_id=${jobId}`,
    method: "GET",
    title: "Job details",
  };
  const { isPending, isError, data, refetch } = useQuery({
    queryKey: [`${projectDetails.projectName || "public"}-jobs-${jobId}`],
    queryFn: () => useFetch<JobTypes>(fetchDetails),
  });

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/jobs" />
      </div>
      <Title text1="Job" text2="Details" />
      <div className="mt-12">
        {isPending ? (
          <p>Loading....</p>
        ) : isError && !data?.data ? (
          <ErrorFetching message="Job detail" retry={() => refetch} />
        ) : data.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <JobDetail job={data.data[0]} />
        )}
      </div>
    </section>
  );
}
