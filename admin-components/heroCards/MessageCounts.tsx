"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HeroCardsSkeleton from "../admin-hero/HeroCardsSkeleton";
import HeroCard from "../admin-hero/HeroCard";
import { MessageCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { MessageTypes } from "@/models/types";

function MessageCounts() {
  const fetchDetails = {
    endpoint: "/api/messages/list-all-messages",
    method: "GET",
    title: "messages",
  };

  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ["kitchen-messages"],
    queryFn: () => useFetch<MessageTypes>(fetchDetails),
  });
  return (
    <div>
      <div>
        {isPending ? (
          <HeroCardsSkeleton />
        ) : !data?.data || !data.success || isError ? (
          <HeroCard
            Icon={MessageCircle}
            interval="Network Error"
            percent={"0%"}
            title="Messages"
            amount={0.0}
            Graph={TrendingDown}
            color={"red"}
          />
        ) : (
          <div>
            <HeroCard
              Icon={MessageCircle}
              interval="Total messages"
              percent={data.data.length > 10 ? "+7%" : "-2%"}
              title="Messages"
              amount={data.data.length}
              Graph={data.data.length > 10 ? TrendingUp : TrendingDown}
              color={data.data.length > 10 ? "green" : "red"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageCounts;
