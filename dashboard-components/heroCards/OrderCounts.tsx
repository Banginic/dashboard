'use client'
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HeroCardsSkeleton from "../skeletons/HeroCardsSkeleton";
import HeroCard from "../HeroCard";
import { ShoppingCart, TrendingDown, TrendingUp } from "lucide-react";
import { OrdersTypes } from "@/models/types";
import { useFetch } from "@/hooks/useFetch";

function OrderCounts() {
const fetchDetails = {
  endpoint: '/api/orders/list-all-orders',
  method: 'GET',
  title: 'orders'
}

  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ["kitchen-messages"],
    queryFn: () => useFetch<OrdersTypes>(fetchDetails),
  });
  return (
    <div>
      <div>
        {isPending ? (
          <HeroCardsSkeleton />
        ) : !data?.data || !data.success || isError ? (
          <HeroCard
              Icon={ShoppingCart}
              interval="Network Error"
              percent={'0%'}
              title="Orders"
              amount={0.0}
              Graph={TrendingDown}
              color={ 'red'}
            />
        )  : (
          <div>
            <HeroCard
              Icon={ShoppingCart}
              interval="This week"
              percent={data.data.length > 10 ? "+7%" : "-2%"}
              title="Orders"
              amount={data.data.length}
              Graph={data.data.length > 10 ? TrendingUp : TrendingDown}
              color={data.data.length > 10 ? 'green' : 'red'}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderCounts;
