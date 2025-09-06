"use client";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import {
  ErrorFetching,
  JobCard,
  NoData,
  ProductForm,
  Title,
  JobCardSkeleton,
} from "@/dashboard-components/index";
import { useQuery } from "@tanstack/react-query";
import { JobTypes } from "@/models/types";

function Jobs() {
  const [showProductForm, setProductForm] = useState(false);
  const fetchDetails = {
    endpoint: "/jobs/list-all-jobs?limit=20",
    method: "GET",
    title: "Jobs",
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: ["admin-Jobs"],
    queryFn: () => useFetch<JobTypes>(fetchDetails),
  });

  function openPharmacyForm() {
    setProductForm(true);
  }
  return (
    <div className="py-8 relative overflow-y-auto">
      <Title text1="Jobs" />

      <div className="w-[95%] max-w-3xl mx-auto">
        <div className="flex gap-4">
          <button
            onClick={openPharmacyForm}
            className="py-2 px-4 rounded bg-indigo-800 mt-12 cursor-pointer hover:opacity-80 text-neutral-100 text-sm flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>Post Job</span>
          </button>
          <button
            onClick={openPharmacyForm}
            className="py-2 px-4 rounded bg-indigo-800 mt-12 cursor-pointer hover:opacity-80 text-neutral-100 text-sm flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>Job Applications</span>
          </button>
        </div>

        <section className="mt-12 ">
          {isPending ? (
            <JobCardSkeleton />
          ) : !data?.success || !data ? (
            <ErrorFetching message={"Jobs"} retry={refetch} />
          ) : data?.data.length === 0 && data.message ? (
            <NoData message={data.message} />
          ) : (
            <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
              {data?.data.map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      <>
        {showProductForm && (
          <div className="fixed inset-0 bg-black/80 h-screen border grid place-items-center ovrerflow--scroll">
            <ProductForm closeForm={setProductForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default Jobs;
