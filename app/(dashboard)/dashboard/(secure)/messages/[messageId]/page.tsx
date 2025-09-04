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
} from "@/dashboard-components/index";
import { useFetch } from "@/hooks/useFetch";
import { MessageTypes } from "@/models/types";

function MessageDetail({ params }: { params: Promise<{ messageId: string }> }) {
  const { messageId } = use(params);
  const fetchDetails = {
    endpoint: `/api/messages/list-single-message?messageId=${messageId}`,
    method: "GET",
    title: "message",
  };
  const { data, isPending, refetch, isError } = useQuery({
    queryKey: [`Kitchen-messages-${messageId}`],
    queryFn: () => useFetch<MessageTypes>(fetchDetails),
  });

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/kitchen/messages" />
      </div>
      <Title text1="Message" text2="Details" />
      <div className="mt-12">
        {isPending ? (
          <MessageDetailsSkeleton />
        ) : isError && !data?.data ? (
          <ErrorFetching message="Message" retry={() => refetch} />
        ) : data.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <MessageDetails message={data.data[0]} />
        )}
      </div>
    </section>
  );
}

export default MessageDetail;
