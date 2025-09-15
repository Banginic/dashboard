"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  NoData,
  ErrorFetching,
  MessageDetails,
  MessageDetailsSkeleton,
  Title,
  Back,
  AdminDetails,
} from "@/admin-components/index";
import { useFetch } from "@/hooks/useFetch";
import { AdminTypes } from "@/models/types";

function MessageDetail({ params }: { params: Promise<{ adminId: string }> }) {
  const { adminId } = use(params);
  const fetchDetails = {
    endpoint: `/admins/list-single-admin?admin_id=${adminId}`,
    method: "GET",
    title: "admin",
  };
  const { data, isPending, refetch, isError } = useQuery({
    queryKey: [`admin-${adminId}`],
    queryFn: () => useFetch<AdminTypes>(fetchDetails),
  });

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/dashboard/admin-users" />
      </div>
      <Title text1="Admin" text2="Details" />
      <div className="mt-12">
        {isPending ? (
          <MessageDetailsSkeleton />
        ) : isError && !data?.data ? (
          <ErrorFetching message="Message" retry={() => refetch} />
        ) : data.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <AdminDetails admin={data.data[0]} />
        )}
      </div>
    </section>
  );
}

export default MessageDetail;
