"use client";
import { TestimonialType, TestimonialTypes } from "@/models/types";
import { Star, Trash } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { kitchenClient } from "@/app/queryProviders/kitchenProvider";
import LoadingBTN from "../LoadingBTN";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialType;
}) {
  const { id, phone, name, project, message, rating, photo } = testimonial;
  const fetchDetails = {
    endpoint: `/api/testimonials/delete-single-testimony?testimonial_id=${id}`,
    method: "DELETE",
    title: "testimonials",
  };
  const { mutate, isPending } = useMutation({
    mutationFn: () => useFetch<TestimonialTypes>(fetchDetails),
    onSuccess: () => {
      toast.success("Testimony deleted successfully");
      kitchenClient.invalidateQueries({ queryKey: ["admin-testimonies"] });
    },
    onError: () => {
      toast.error("Error deleting testimony");
    },
  });
  function deleteTestimony() {
    mutate();
  }
  return (
    <article className="border border-gray-300 p-4  rounded text-neutral-700 w-[95%] text-sm max-w-3xl mx-auto shadow-md hover:shadow-indigo-300 trans">
      <div className="flex justify-between items-center relative">
        {/* Image */}
        <div className="h-32 w-32 overflow-hidden rounded-md bg-gray-300">
          <Image
            src={photo}
            width={400}
            height={400}
            alt={` Employee ${name}`}
          />
        </div>
        <div className="flex flex-col mt-2">
          <h2 className="font-semibold">{name}</h2>
          <p className="text-indigo-500 ">{project}</p>
          <p className="text-neutral-500 ">{phone}</p>
        </div>

        <p className="flex items-center gap-1 mb-1 absolute -top-2 right-0 bg-yellow-100 py-1 px-2 rounded-lg">
          <span>{rating}</span>
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
        </p>
      </div>
      <p className="min-h-20 bg-gray-200 rounded p-2 mt-4">{message}</p>
      <button
        disabled={isPending}
        onClick={deleteTestimony}
        className="py-2 px-4 rounded flex justify-center disabled:bg-gray-300 mt-4  bg-red-100 hover:bg-red-400 cursor-pointer text-red-800"
      >
        {isPending ? (
          <LoadingBTN message="Deleting..." />
        ) : (
          <div className="flex gap-2 items-center">
            <Trash size={18} />
            <span>Delete</span>
          </div>
        )}
      </button>
    </article>
  );
}
