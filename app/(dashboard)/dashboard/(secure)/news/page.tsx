"use client";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { NewsTypes } from "@/models/types";
import {
  ErrorFetching,
  NewsDetails,
  NoData,
  NewsForm,
  NewsDetailsSkeleton,
  Title,
} from "@/dashboard-components/index";
import { useQuery } from "@tanstack/react-query";

function News() {
  const [showNewsForm, setNewsForm] = useState(false);
  const fetchDetails = {
    endpoint: "/api/news/list-all-news?limit=15",
    method: "GET",
    title: "news",
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: ["kitchen-news"],
    queryFn: () => useFetch<NewsTypes>(fetchDetails),
  });
  function toggleNewsForm() {
    setNewsForm(true);
  }
  return (
    <div className="py-8 relative">
      <Title text1="News" />

      <div className=" w-[95%] max-w-3xl mx-auto">
        <button
          onClick={toggleNewsForm}
          className="py-2 px-4 rounded bg-indigo-800 mt-12 cursor-pointer hover:opacity-80 text-neutral-100 text-sm flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span>Create News</span>
        </button>
        <section className="mt-12 ">
          {isPending ? (
            <NewsDetailsSkeleton />
          ) : !data?.success ? (
            <ErrorFetching message={"News"} retry={refetch} />
          ) : data?.data.length === 0 && data?.message ? (
            <NoData message={data.message} />
          ) : (
            <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
              {data?.data.map((item) => (
                <NewsDetails key={item.id} news={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      <>
        {showNewsForm && (
          <div className="fixed inset-0 bg-black/80 grid place-items-center">
            <NewsForm setNewsForm={setNewsForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default News;
