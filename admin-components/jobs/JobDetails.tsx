"use client";
import { JobType, MessageTypes } from "@/models/types";
import { LoaderCircle, Reply, Trash } from "lucide-react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { dashboardProvider } from "@/providers/admin-provider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { projectDetails } from "@/constants/project-details";

function JobDetails({ job }: { job: JobType }) {
  const { id, title, location, description, latestDate, createdAt } = job;

  const fetchDetails = {
    endpoint: `/jobs/delete-single-job?job_id=${id}`,
    method: "DELETE",
    title: "job",
  };
  const router = useRouter();

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: () => useFetch<MessageTypes>(fetchDetails),
    onSuccess: (data) => {
      if (!data.success) {
        toast.error("Error deleting job");
        return;
      }
      toast.success("Message Deleted Successfully");
      dashboardProvider.invalidateQueries({
        queryKey: [`${projectDetails.projectName || "dashboard"}-jobs-${id}`],
      });
      router.push("/dashboard/jobs");
      return;
    },
    onError: () => {
      toast.warning("Errror Deleting Message");
    },
  });
  function deleteMessage() {
    deleteMutate();
  }

  return (
    <article className="mt-12 border bg-secondary text-foreground relative border-secondary-foreground/30 rounded-lg p-6 max-w-3xl mx-auto">
      <section>
        <div className="flex justify-between bg-sidebar/50  rounded p-4">
          <div className="flex flex-col text-sm">
            <span className="text-secondary-foreground/90">Job Id</span>
            <span>{id.slice(28)}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-secondary-foreground/90">Posted Date</span>
            <span className=" text-yellow-500">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-secondary-foreground/90">Latest Date</span>
            <span className=" text-green-700">
              {new Date(latestDate).toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 ml-4">
          <div className="flex flex-col text-sm">
            <span className="text-secondary-foreground/70">Job Title</span>
            <span className="text-[16px] font-semibold">{title}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-secondary-foreground/70">Location</span>
            <span className="text-chart-2">{location}</span>
          </div>
        </div>
        <div className="mt-4 ml-4">
          <div className="flex flex-col text-sm  mt-2">
            <span className="text-secondary-foreground/70">
              Job description
            </span>
            <span className="text-secondary-foreground bg-sidebar rounded p-4 mt-1 min-h-20">
              {description}
            </span>
          </div>
        </div>
      </section>

      {/* Button */}
      <div className="flex gap-4 mt-8 ml-4">
        <button
          onClick={deleteMessage}
          className="text-sm flex items-center text-white gap-2 bg-destructive hover:scale-x-105  py-2 px-4 rounded cursor-pointer trans"
        >
          {deletePending ? (
            <div className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" size={18} />
              <span className="animate-pulse">Deleting</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Trash size={18} />
              <span>Delete</span>
            </div>
          )}
        </button>
      </div>
    </article>
  );
}

export default JobDetails;
