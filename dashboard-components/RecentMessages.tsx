"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import MessageCard from "./MessageCard";
import MessageCardSkeleton from "./skeletons/MessageCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { MessageTypes } from "@/models/types";
import { NoData, ErrorFetching } from "@/dashboard-components/index";

function RecenctMessages() {
  const fetchDetails = {
    endpoint: "/api/messages/list-all-messages?limit=3",
    method: "GET",
    title: "Messages",
  };
  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ["kitchen-messages"],
    queryFn: () => useFetch<MessageTypes>(fetchDetails),
  });
  return (
    <section className="mt-16 text-forground py-6 px-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">Recent Messages</h1>
          <p className="text-secondary-foreground/70 text-xs lg:text-sm">
            Latest messaeges from your website
          </p>
        </div>
        <Link
          href={"/dashboard/messages"}
          className="text-xs flex items-center gap-2  border border-gray-300 hover:border-gray-500 cursor-pointer py-2 px-4 rounded"
        >
          <span>View All</span>
          <ArrowRight size={18} />
        </Link>
      </div>
      <div>
        {isPending ? (
          <MessageCardSkeleton />
        ) : !data?.data || !data.success || isError ? (
          <ErrorFetching message="Messages" retry={refetch} />
        ) : data.data.length === 0 && data.message ? (
          <NoData message={data.message} />
        ) : (
          <div className="space-y-2 lg:space-y-4 mt-4">
            {data.data.map((item) => (
              <MessageCard message={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecenctMessages;
