'use client'
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HeroCardsSkeleton from "../skeletons/HeroCardsSkeleton";
import HeroCard from "../HeroCard";
import { DollarSignIcon, TrendingDown, TrendingUp } from "lucide-react";
import { OrdersTypes } from "@/models/types";
import { useFetch } from "@/hooks/useFetch";

function ProductCounts() {
const fetchDetails = {
  endpoint: '/api/orders/list-all-orders',
  method: 'GET',
  title: 'orders'
}

  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ["kitchen-orders"],
    queryFn: () => useFetch<OrdersTypes>(fetchDetails),
  });
  return (
    <div>
      <div>
        {isPending ? (
          <HeroCardsSkeleton />
        ) : !data?.data || !data.success || isError ? (
          <HeroCard   Icon={DollarSignIcon}
              interval="Network Error"
              percent={'0%'}
              Graph={ TrendingDown }
              title="Total Revenue"
              amount={0}
              color={'red'}
            />
        )  : (
          <div>
            <HeroCard   Icon={DollarSignIcon}
              interval={data.data.length > 10 ? "This week" : "This week"}
              Graph={data.data.length > 10 ? TrendingUp : TrendingDown}
              percent={data.data.length > 10 ? "+15.2%" : "-2%"}
              title="Total Revenue"
              amount={data.data.length}
              color={data.data.length > 10 ? 'green' : 'red'}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCounts;
