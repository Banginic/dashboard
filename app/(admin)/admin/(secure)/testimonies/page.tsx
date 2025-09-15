"use client";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { TestimonialTypes } from "@/models/types";
import {
  ErrorFetching,
  NoData,
  TestimonialForm,
  TestimonialCard,
  TestimonialCardSkeleton,
  Title,
} from "@/admin-components/index";
import { useQuery } from "@tanstack/react-query";

function Testimonials() {
  const [showEmployeeForm, setEmployeeForm] = useState(false);
  const fetchDetails = {
    endpoint: "/testimonials/list-all-testimonies?limit=10",
    method: "GET",
    title: "Testimonials",
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: ["admin-testimonies"],
    queryFn: () => useFetch<TestimonialTypes>(fetchDetails),
  });

  function openPharmacyForm() {
    setEmployeeForm(true);
  }
  return (
    <div className="py-8 relative overflow-y-auto">
      <Title text1="Testimonials" />

      <div className="w-[95%] max-w-3xl mx-auto">
        <button
          onClick={openPharmacyForm}
          className="py-2 px-4 rounded bg-indigo-800 mt-12 ml-[5%] cursor-pointer hover:opacity-80 text-neutral-100 text-sm flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span>Add Testimony</span>
        </button>

        <section className="mt-12 ">
          {isPending ? (
            <TestimonialCardSkeleton />
          ) : !data?.success || !data ? (
            <ErrorFetching message={"Testimonials"} retry={refetch} />
          ) : data?.data.length === 0 && data.message ? (
            <NoData message={data.message} />
          ) : (
            <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
              {data?.data.map((item) => (
                <TestimonialCard key={item.id} testimonial={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      <>
        {showEmployeeForm && (
          <div className="fixed inset-0 bg-black/80 h-screen border grid place-items-center ovrerflow-scroll">
            <TestimonialForm closeForm={setEmployeeForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default Testimonials;
